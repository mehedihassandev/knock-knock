import styleGuide from "eslint-config-standard";


export default {
  files: ['*.js', '*.mjs'],
  parser: {
    name: 'espree',
    options: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  rules: {
    ...styleGuide.rules,
  },
};
