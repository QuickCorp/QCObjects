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
    "eslint:recommended", "plugin:@typescript-eslint/recommended",
    "qcobjects"

  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true
};
