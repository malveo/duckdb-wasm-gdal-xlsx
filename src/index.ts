import * as duckdb from "@duckdb/duckdb-wasm";

const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

async function loadDuckDb(file: File): Promise<void> {
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

  console.log("Selected bundle", bundle);
  console.log("filename", file.name);
  console.log("filetype", file.type);
  console.log("filesize", file.size);

  const worker_url = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker!}");`], {
      type: "text/javascript",
    })
  );

  const worker = new Worker(worker_url);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  URL.revokeObjectURL(worker_url);

  const conn = await db.connect();

  await db.registerFileHandle(
    `file.xlsx`,
    file,
    duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
    true
  );

  const c = await db.connect();
  await c.query("INSTALL spatial; LOAD spatial;");
  const read_xlsx = await c.query(
    `CREATE OR REPLACE TABLE table1 AS SELECT * FROM ST_Read('file.xlsx');`
  );

  await c.close();
}

function onChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    loadDuckDb(target.files[0]);
  }
}

document.getElementById("fileInput")?.addEventListener("change", onChange);
