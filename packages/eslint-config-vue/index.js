'use strict';

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@fds/eslint-config-base',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2020: true,
  },
  rules: {
    'vue/multi-word-component-names': 'warn',
  },
};
