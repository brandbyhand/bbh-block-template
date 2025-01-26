/**
 * External dependencies
 */
const { join } = require('path');
const { config } = require('process');

module.exports = {
	defaultValues: {
		slug: 'bbh-custom-block',
		title: 'Brand by Hand block',
		description: 'Brand by Hand block',
		attributes: {},
		supports: {
			html: false,
		},
		example: {},
		// We need the --webpack-copy-php to copy the render.php file to the dist folder.
		// Therefor we override the existing scripts created by @wordpress/create-block
		// $(npm run paths:js -s)/$(npm run paths:scss -s) is used to dynamically insert the file paths in where they should be used,
		// without having to use them in each seperate script
		// $(), command substitution, allows dynamic injecting into scripts
		// -s it to prevent output to the console when running npm run
		customScripts: {
			build: 'cross-env npm run "format" && wp-scripts build --webpack-copy-php --mode=production',
			start: 'cross-env wp-scripts start --webpack-copy-php --mode=production',
			format: 'cross-env npm run "format:css:fix" && npm run "format:js:fix"',
			'format:css':
				'cross-env npx prettier --check --no-error-on-unmatched-pattern %npm_package_config_scss%',
			'format:css:fix':
				'cross-env npx prettier --write --no-error-on-unmatched-pattern %npm_package_config_scss%',
			'format:fix': 'cross-env npm run "format:css:fix" && npm run "format:js:fix"',
			'format:js':
				'cross-env npx prettier --check --no-error-on-unmatched-pattern %npm_package_config_js%',
			'format:js:fix':
				'cross-env npx prettier --write --no-error-on-unmatched-pattern %npm_package_config_js%',
			lint: 'cross-env npm run "lint:css" && npm run "lint:js"',
			'lint:css': 'cross-env npx stylelint %npm_package_config_scss%',
			'lint:css:fix': 'cross-env npx stylelint --fix %npm_package_config_scss%',
			'lint:fix': 'cross-env npm run "lint:css:fix" && npm run "lint:js:fix"',
			'lint:js':
				'cross-env npx eslint --no-error-on-unmatched-pattern "*.{js,ts,jsx,tsx}" %npm_package_config_js%',
			'lint:js:fix':
				'cross-env npx eslint --fix --no-error-on-unmatched-pattern "*.{js,ts,jsx,tsx}" %npm_package_config_js%',
		},
		// Default value if build/index.js, we use dist/main.js
		customPackageJSON: {
			main: 'dist/main.js',
			config: {
				scss: 'echo "src/block/editor/scss/*.scss" "src/block/frontend/scss/*.scss"',
				js: 'echo "src/block/editor/js/*.{js,ts,jsx,tsx}" "src/block/editor/js/controls/*.{js,ts,jsx,tsx}" "src/block/frontend/js/*.{js,ts,jsx,tsx}"',
			},
		},
		// Adds an additional folder inside src when scaffolding.
		// Default is src.
		folderName: 'src/block',
		transformer: (view) => {
			const { slug, title, namespace, textdomain } = view;

			return {
				...view,
				customBlockJSON: {
					editorScript: 'file:../main.js',
					editorStyle: 'file:../main.css',
					style: 'file:../style-index.css',
					render: `file:./frontend/render.php`,
					viewScript: 'file:../view.js',
					textdomain: textdomain, // Access the dynamically created textdomain
					name: `${namespace}/${slug}`, // Combine namespace and slug
					title: `${title}`,
				},
			};
		},
		// For older node versions (like node 16)
		// wpScripts: false,
		// npmDevDependencies: ['@wordpress/scripts@27.9.0', 'prettier', 'stylelint@15.10.3', 'stylelint-config-standard@34.0.0', 'stylelint-webpack-plugin@4.1.1', 'slash', 'eslint', 'eslint-config-prettier', 'eslint-config-standard', 'eslint-plugin-jsx', 'eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-webpack-plugin'],
		// For newer node versions (above 20)
		wpScripts: true,
		npmDevDependencies: [
			'prettier',
			'stylelint',
			'stylelint-config-standard',
			'stylelint-webpack-plugin',
			'slash',
			'eslint@8.57.1',
			'eslint-config-prettier',
			'eslint-config-standard',
			'eslint-plugin-jsx',
			'eslint-plugin-react',
			'eslint-plugin-react-hooks',
			'eslint-webpack-plugin',
			'cross-env'
		],
	},
	// Copy the plugin-templates to the root of the project folder where the template is used
	pluginTemplatesPath: join(__dirname, 'plugin-templates'),
	// Copy the block-templates to the root of the project folder where the template is used, adds src/block, so path becomes plugin>src/block/{files-from-block-templates}
	blockTemplatesPath: join(__dirname, 'block-templates'),
};
