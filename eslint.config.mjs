import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
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

export default [...compat.extends("airbnb-base"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".js", ".json"],
            },
        },

        "import/extensions": [".js", ".ts"],
    },

    rules: {
        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            ts: "never",
        }],

        "no-underscore-dangle": ["error", {
            allow: ["_id"],
        }],

        "no-unused-vars": ["error", {
            args: "none",
        }],
    },
}];