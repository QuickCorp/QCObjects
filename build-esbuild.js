// build.js
const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');
const path = require('path');

esbuild.build({
    entryPoints: ['src/QCObjects.ts'], // Your entry file
    bundle: true,
    outfile: 'browser/QCObjects.js', // Output file
    platform: 'node', // or 'browser' depending on your target environment
    format: 'cjs', // or 'esm' depending on your module system    
    target: ['node22'], // Adjust based on your target environment
    tsconfig: 'tsconfig.json', // Path to your tsconfig.json,
    plugins: [
        alias({
            'types': path.join(__dirname, 'src/types/index.d.ts')
        })
    ]    
}).catch(() => process.exit(1));
