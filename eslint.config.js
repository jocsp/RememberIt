import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { configs, plugins } from "eslint-config-airbnb-extended";
import { defineConfig, globalIgnores } from "eslint/config";

const jsConfig = [
    // ESLint Recommended Rules
    {
        name: "js/config",
        ...js.configs.recommended,
    },
    // Stylistic Plugin
    plugins.stylistic,
    // Import X Plugin
    plugins.importX,
    // Airbnb Base Recommended Config
    ...configs.base.recommended,
];

const reactConfig = [
    // React Plugin
    plugins.react,
    // React Hooks Plugin
    plugins.reactHooks,
    // React JSX A11y Plugin
    plugins.reactA11y,
    // Airbnb React Recommended Config
    ...configs.react.recommended,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
        },
    },
];

const typescriptConfig = [
    // TypeScript ESLint Plugin
    plugins.typescriptEslint,
    // Airbnb Base TypeScript Config
    ...configs.base.typescript,
    // Airbnb React TypeScript Config
    ...configs.react.typescript,
];

export default defineConfig([
    globalIgnores(["dist", "node_modules", "build"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    jsConfig,
    reactConfig,
    typescriptConfig,
    eslintConfigPrettier,
]);
