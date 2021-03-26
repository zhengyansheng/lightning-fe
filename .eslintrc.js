module.exports = {
    root: false,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
    },
    extends: [
      'plugin:vue/essential',
      'standard'
    ],
    globals: {
      'VUE_ENV': true,
      'CountUp': true
    },
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {
      "camelcase": 0,
      'generator-star-spacing': 'off',
      "no-irregular-whitespace": "off", // 这禁止掉 空格报错检查
      "indent": 0, // 空格2~4位
      "semi": 0, // 不检测结尾冒号
      "space-before-function-paren": 0, // 函数括号前加入空格
      "eol-last": 0,
      "no-useless-escape": 0,
      "no-eval": 0, // 可以使用eval
      "no-new": 0,
      "eqeqeq": 0
    }
  }