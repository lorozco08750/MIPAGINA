module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:html/recommended",
  ],
  plugins: ["html"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.html"],
      rules: {
        // Permite atributos de tipo datos o accesibilidad en HTML sin marcarlos como errores.
        "html/indent": "off",
      },
    },
  ],
  rules: {
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
  },
  globals: {
    bootstrap: "readonly",
  },
};
