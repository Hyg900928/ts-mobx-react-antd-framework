const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/no-explicit-any': 0,
    semi: 0,
    'no-useless-constructor': 0,
    'jsx-quotes': 0,
    'no-nested-ternary': 0,
    'max-len': 0,
    'arrow-body-style': 0,
    'no-unsafe-finally': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'no-console': 0,
    'sort-imports': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'arrow-parens': 0,
    'react/prefer-stateless-function': 0,
    'no-plusplus': 0,
  },
  globals: {
    Hyg: true,
    __DEV__: true,
  },
};
