// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin')

module.exports = [
  stylistic.configs['recommended-flat'],
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
  ),
  {
    name: "to-be-removed-eventually",
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    name: 'sucks-to-use-sucky-code',
    rules: {
      "@typescript-eslint/no-namespace": "off" // chai extend
    }
  },
  {
    name: 'here-to-stay',
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "@stylistic/quotes": ["error", "double"]
    },
  },
  {
    ignores: ["eslint.config.js", "eslint.config.base.js"]
  }
]
  