import globals from "globals";
import pluginJs from "@eslint/js";
import eslintJest from "eslint-plugin-jest"; // импортируем плагин jest

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest, // Добавляем глобальные переменные Jest
      },
    },
  },
  pluginJs.configs.recommended,
  ...compat.extends("eslint-config-airbnb-base"),
  {
    rules: {
      "import/extensions": "off",
      "import/prefer-default-export": "off",
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
  {
    // Настраиваем плагин jest
    plugins: {
      jest: {
        overrides: [
          {
            files: ["**/*.js"], // Указываем, какие файлы следует обрабатывать плагином Jest
            rules: {
              "jest/no-disabled-tests": "warn", // Настройка правил плагина Jest
              "jest/no-focused-tests": "error",
              "jest/prefer-to-have-length": "warn",
            },
          },
        ],
      },
    },
  },
];
