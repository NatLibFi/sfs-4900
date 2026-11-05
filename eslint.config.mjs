import tseslint from 'typescript-eslint';

// Eslint configuration object for src
const configSrc = {
  files: [
    "src/**/*.ts"
  ],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    ...tseslint.configs.recommended[0].rules,
    "no-console": "warn",
    "eqeqeq": ["error", "always"],
    "no-const-assign": "error",
    "max-depth": ["warn", 4],
    "max-lines": ["warn", 500],
    "max-lines-per-function": ["warn", {"max": 100}],
    "no-else-return": ["error", {allowElseIf: false}],
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "array-callback-return": [
      "error",
      {
        "checkForEach": false
      }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "next"
      }
    ],
    "no-warning-comments": "off"
  }
};

// Eslint configuration object for globally ignoring .js files
// - ignore all files that start with a dot
// - ignore all files inside directories named 'dist'
const configIgnores = {
  ignores: [
    "**/.*",
    "**/dist/"
  ]
};

export default [
  configSrc,
  configIgnores
];
