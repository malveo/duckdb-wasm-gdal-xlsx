
# duckdb-wasm-gdal-xlsx

## Vanilla-TS with registerFileHandle: How to test it

```shell
npm install
npm run build
npm run dev
```

go to http://localhost:5173/index.html, open the console and upload a xlsx file.

```
@duckdb_duckdb-wasm.js?v=2d45eaab:12032 Uncaught (in promise) 
Error: IO Error: GDAL Error (4): `test.xlsx' not recognized as a supported file format.
    at O.onMessage (@duckdb_duckdb-wasm.…v=2d45eaab:12032:15)
await in onMessage (async)		
onChange	@	index.ts:58
Show 1 more frame
```

## Plain HTML

A plain HTML version with WASM that load a XLSX file via HTTP work as expected, take a look at: `public/vanilla/index.html`
