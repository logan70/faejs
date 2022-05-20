const prettierConfig = require('../../../.prettierrc.js')

module.exports = {
  rules: {
    // 以下为规则覆盖
    'prettier/prettier': ['error', prettierConfig],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
          Object: false,
          '{}': false,
        },
      },
    ],
    'max-classes-per-file': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'filenames/match-exported': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    'promise/prefer-await-to-then': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  // tsconfigRootDir 指定了 tsserver 用哪个 tsconfig.json 启动 typecheck。(by mjc)
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  // 要忽略的内容
  ignorePatterns: ['lib/**', '.rush/**'],
}
