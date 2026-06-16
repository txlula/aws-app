// eslint.config.js
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      semi: ["error", "always"],
      "prefer-const": "error",
    },
  },

  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
    ],
  },
];