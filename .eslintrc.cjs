module.exports = {
	root: true,
	env: {browser: true, es2020: true},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'fsd-architecture-checker'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{allowConstantExport: true},
		],
		'fsd-architecture-checker/import-path-checker': ['error', { alias: '@' }],
		'fsd-architecture-checker/public-api-import': [
			'error',
			{
				alias: '@',
				testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
			},
		],
		'fsd-architecture-checker/layers-imports-order': [
			'error',
			{
				alias: '@',
				ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
			},
		],
	},
};
