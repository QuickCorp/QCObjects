// build.js
const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("path");

const baseSettings = {
    entryPoints: [], // Your entry file
    bundle: true,
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    target: ["esnext", "node22"], // Adjust based on your target environment
    tsconfig: "tsconfig.json", // Path to your tsconfig.json,
    globalName: "global",
    minify:false,
    keepNames: true,
    sourcemap: true,
    splitting: false,
    chunkNames: "chunks/[name]-[hash]",
    plugins: [
        alias({
            "@types": path.join(__dirname, "src/types/global/index.d.ts")
        })
    ],
    external: ["os", "path", "http", "url", 
        "child_process", "events", "fs", "process","node:process",
        "node:fs", "node:os", "node:child_process", 
        "node:path", "readline", "node:net", "node:repl",
        "node:vm", "http2", "vm", "qcobjects", "qcobjects-sdk"
    ]

};

const cjsSettings = {...baseSettings,
    entryPoints: ["src/index.cts"], // Your entry file
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    platform: "node", // or "browser" depending on your target environment
    outExtension: {
        ".js":".cjs"
    }

};

const esmSettings = {...baseSettings,
    entryPoints: ["src/index.mts"], // Your entry file
    outdir: "public/esm", // Output dir
    format: "esm", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js":".mjs"
    }

};

const browserSettings = {...baseSettings,
    entryPoints: ["src/qcobjects.ts"], // Your entry file
    bundle: true,
    outdir: "public/browser", // Output dir
    format: "iife", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js":".js"
    }
};

const logError = (e) => {console.log(e);process.exit(1);};

esbuild.build(cjsSettings).catch(logError);
esbuild.build(esmSettings).catch(logError);
esbuild.build(browserSettings).catch(logError);
