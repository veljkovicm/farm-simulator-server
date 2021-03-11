module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.spect.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'object-curly-newline': ['error', { 'minProperties': 3, 'consistent': true }],
    'max-len': ['error', { code: 100, ignoreStrings: true, ignoreUrls: true, ignoreTemplateLiterals: true, ignoreComments: true }],
    'array-bracket-spacing': [ 'error', 'always', { arraysInArrays: false, objectsInArrays: false, singleValue: false } ],
    'space-before-blocks': ['error', 'always'],
    'comma-dangle': [
      'error', // Minify git diffs
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
