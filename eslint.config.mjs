

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// export default [
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
//   {
//     languageOptions: {
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: globals.browser,
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.recommended,
//   {
//     rules: {
//       "react/react-in-jsx-scope": "off",
//     },
//   },
// ];


import globals from "globals";
import pluginJs from "@eslint/js";
import { ESLint } from "eslint";
import pluginReact from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  typescriptEslint.configs.recommended,
  pluginReact.configs.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
