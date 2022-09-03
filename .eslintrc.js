module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "@eove/eslint-config-electron",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "no-relative-import-paths",
    "tailwindcss",
  ],

  rules: {
    "react/react-in-jsx-scope": "off",
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        allowSameFolder: true,
        rootDir: "src",
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
