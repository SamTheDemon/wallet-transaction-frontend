module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
  extends: [
    'plugin:vue/vue3-essential',  // Use this for Vue 3
    // 'plugin:vue/essential',  // Use this line instead for Vue 2
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  // parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint"
    // parser: '@babel/eslint-parser',  // This is the JavaScript parser
    // requireConfigFile: false,  // This tells Babel parser not to look for a config file
    // ecmaVersion: 2021,  // Ensures modern JavaScript features are parsed correctly
    // sourceType: 'module',  // Allows use of import/export statements
  },
  ignorePatterns: ['babel.config.js'],
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "semi": false
    }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'no-unused-vars': 'warn'
  },
};
