module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['xo', 'xo-typescript', 'prettier'],
    ignorePatterns: ['*.js', 'dist/**/*', '*.html', 'node_modules'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'capitalized-comments': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-redeclare': 0,
        '@typescript-eslint/consistent-type-definitions': 0,
    },
};
