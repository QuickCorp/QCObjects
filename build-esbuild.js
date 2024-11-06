// build.js
const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("path");

const baseSettings = {
    entryPoints: ["src/*.ts", "src/*.mts", "src/*.cts"], // Your entry file
    bundle: true,
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    target: ["esnext"], // Adjust based on your target environment
    tsconfig: "tsconfig.json", // Path to your tsconfig.json,
    globalName: "global",
    minify:false,
    keepNames: true,
    sourcemap: true,
    splitting: false,
    chunkNames: "chunks/[name]-[hash]",
    plugins: [
        alias({
            "types": path.join(__dirname, "src/types/global/index.d.ts")
        })
    ]    
};

const cjsSettings = {...baseSettings,
    entryPoints: ["src/*.cts"], // Your entry file
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    platform: "node", // or "browser" depending on your target environment
    outExtension: {
        ".js":".cjs"
    }

};

const esmSettings = {...baseSettings,
    entryPoints: ["src/*.mts"], // Your entry file
    outdir: "public/esm", // Output dir
    format: "esm", // or "esm" depending on your module system    
    platform: "neutral", // or "browser" depending on your target environment
    outExtension: {
        ".js":".mjs"
    }

};

const browserSettings = {...baseSettings,
    entryPoints: ["src/*.mts"], // Your entry file
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
