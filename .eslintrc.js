module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-v-for-key': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'off',
    'no-unsafe-finally': 'off',
    'no-func-assign': 'off',
    'no-extra-semi': 'off',
    'vue/no-mutating-prop': 'off'
  }
}
