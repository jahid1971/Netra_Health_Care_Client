module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2024: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "next/core-web-vitals",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-extra-boolean-cast": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
    },
};
