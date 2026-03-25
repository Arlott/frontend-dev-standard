'use strict';

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@fds/eslint-config-base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  env: {
    browser: true,
    es2020: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
