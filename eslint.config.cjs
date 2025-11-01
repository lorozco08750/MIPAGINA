const js = require("@eslint/js");
const htmlPlugin = require("eslint-plugin-html");
const globals = require("globals");

const commonLanguageOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  globals: {
    ...globals.browser,
    ...globals.es2022,
    bootstrap: "readonly",
  },
};

const commonRules = {
  ...js.configs.recommended.rules,
  "no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^ignored",
    },
  ],
  "no-var": "error",
  "prefer-const": [
    "error",
    {
      destructuring: "all",
    },
  ],
  "arrow-body-style": ["warn", "as-needed"],
};

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: commonLanguageOptions,
    plugins: {
      html: htmlPlugin,
    },
    rules: commonRules,
  },
  {
    files: ["**/*.html"],
    languageOptions: commonLanguageOptions,
    plugins: {
      html: htmlPlugin,
    },
    rules: {
      ...commonRules,
      "html/indent": "off",
    },
  },
];
