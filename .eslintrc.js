module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    es2020: true,
    es2017: true,
    es6: true
  },

  extends: [
    "semistandard",
    "standard",
    "prettier",
    "eslint:recommended", "plugin:@typescript-eslint/recommended"

  ],
  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "@typescript-eslint/no-explicit-any":"off",
    "@typescript-eslint/no-this-alias":"off",
    "@typescript-eslint/no-unused-vars":"off",
    "@typescript-eslint/ban-types":"off",
    "array-callback-return":"warn",
    "no-useless-call":"off",
    "camelcase":"off",
    "no-var":"off"

  }

};
