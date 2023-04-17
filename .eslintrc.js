module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['xo', 'xo-typescript', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'capitalized-comments': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-redeclare': 0,
    },
};
