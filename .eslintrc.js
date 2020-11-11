module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:sonarjs/recommended",
    ],
    plugins: [
        "sonarjs",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "sonarjs/no-duplicate-string": ["warn", 3],
        "quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "indent": ["error", 4],
        "comma-dangle": ["error", "always-multiline"],
        "semi": ["error", "always"],
        "no-trailing-spaces": "error",
    },
};
