// .eslintrc.js
import globals from "globals";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config(
    eslint.configs.recommended, // Uses ESLint's core recommended rules
    ...tseslint.configs.recommended, // Uses the recommended rules from @typescript-eslint
    {
        // Global configuration for all files
        languageOptions: {
            // Define global environments (e.g., node)
            globals: {
                ...globals.node,
            },
            // Specify the TypeScript parser
            parser: tseslint.parser,
            // Specify the TypeScript configuration file for type-aware rules
            parserOptions: {
                project: './tsconfig.json', // Assumes your TS config file is named tsconfig.json
                ecmaVersion: 2022,
                sourceType: "module",
            },
        },
        // Root configuration for your source files
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // Add custom rules here to override or add to the recommended sets
            // Example: enforce 4-space indentation for better readability
            // '@typescript-eslint/indent': ['error', 4],

            // Example: disallow explicit 'any' type
            // '@typescript-eslint/no-explicit-any': 'error',

            // Example: allow console.log in development, but warn
            'no-console': 'off',
            '@typescript-eslint/no-floating-promises': 'error',

            // Disallows the 'any' type (makes your TS actually useful)
            '@typescript-eslint/no-explicit-any': 'warn',

            // Ensures you don't forget 'await' in async functions
            '@typescript-eslint/await-thenable': 'error',
            'semi': ['error', 'always'],

            // Enforces single quotes (standard in JS/TS)
            'quotes': ['error', 'single', { 'avoidEscape': true }],

            // Requires a specific naming convention for Classes/Interfaces
            '@typescript-eslint/naming-convention': [
                'error',
                { 'selector': 'interface', 'format': ['PascalCase'] },
                { 'selector': 'class', 'format': ['PascalCase'] }
            ],
        }
    }
);