module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        mocha: true
    },
    extends: [
        'airbnb-base',
        'plugin:wdio/recommended'
    ],
    plugins: [
        'wdio',
        'cucumber'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    globals: {
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        allure: 'readonly'
    },
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        'class-methods-use-this': 'off',
        'no-underscore-dangle': 'off',
        'max-len': ['error', { 
            'code': 120,
            'ignoreComments': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true
        }],
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off'
    }
};
