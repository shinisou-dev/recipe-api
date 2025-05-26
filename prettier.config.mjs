export default {
  semi: true,
  trailingComma: 'none',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  bracketSpacing: true,
  arrowParens: 'avoid',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./~]'],
  importOrderParserPlugins: ['typescript', 'decorators'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
