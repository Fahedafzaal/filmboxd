import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly'
            }
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['error', { 
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'caughtErrorsIgnorePattern': '^_'
            }],
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error'
        }
    }
];
