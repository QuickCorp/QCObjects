import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import * as parser from '@typescript-eslint/parser';


import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    { languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
            programs: [parser.createProgram('tsconfig.json')],
        }
        ,        

    } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    { files: ["**/*.{js,mjs,cjs,ts}"] }
    ,{
    ignores: [
        "**/*.js",
        "spec/**/*",
        "src/*.js",
        "src/**/*.js",
        "node_modules/**/*",
        "**/node_modules"   
    ],
}, ...compat.extends("eslint:recommended"), 
{    rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "array-callback-return": "warn",
    "no-useless-call": "off",
    camelcase: "off",
    "no-var": "off",
}},
{
    files: ["**/*.ts", "**/*.d.ts", "**/*.d.tsx", "**/*.tsx"]
},
{   files: ["**/*.d.ts"],
    rules: {
        "no-unused-vars":"off"
    }
},
{
    files: ["**/*.ts", "**/*.d.ts"],
    rules: {
        "no-dupe-class-members":"off",
        "@typescript-eslint/no-unsafe-function-type":"off",
        "no-redeclare": "off",
        "@typescript-eslint/no-unsafe-member-access":"off",
        "@typescript-eslint/no-unsafe-assignment":"off",
        "@typescript-eslint/no-unsafe-call":"off",
        "@typescript-eslint/no-unsafe-argument":"off"

    }
}
];