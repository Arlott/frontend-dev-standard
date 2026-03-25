'use strict';

/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  plugins: [],
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
