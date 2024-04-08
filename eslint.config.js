const parser = require('@typescript-eslint/parser');
const hooksPlugin = require('eslint-plugin-react-hooks');
module.exports =
    {
        plugins: {
            "react-hooks": hooksPlugin,
        },
        rules: hooksPlugin.configs.recommended.rules,
        ignores: ['node_modules/', '.expo/', '.eslintrc.js'],
        languageOptions: {
            parser: parser
        },
    }