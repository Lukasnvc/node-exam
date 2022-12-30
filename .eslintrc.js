module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: [2, "double"],
    "no-unused-vars": 0,
    "no-restricted-syntax": [
      "error",
      "FunctionExpression",
      "FunctionDeclaration",
    ],
  },
};
