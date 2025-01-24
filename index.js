/**
 * External dependencies
 */
const { join } = require('path');

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
			"build": 'npm run \"format\" && wp-scripts build --webpack-copy-php',
			"start": 'wp-scripts start --webpack-copy-php',
			"paths:scss": '\"src/block/editor/scss/*.scss\" \"src/block/frontend/scss/*.scss\"',
			"paths:js": '\"src/block/editor/js/*.{js,ts,jsx,tsx}\" \"./src/block/editor/js/controls/*.{js,ts,jsx,tsx}\" \"src/block/frontend/js/*.{js,ts,jsx,tsx}\"',
			"format": "npm run \"format:css:fix\" && npm run \"format:js:fix\"",
			"format:css": "npx prettier --check --no-error-on-unmatched-pattern $npm_package_scripts_paths_scss",
			"format:css:fix": "npx prettier --write --no-error-on-unmatched-pattern $npm_package_scripts_paths_scss",
			"format:fix": "npm run \"format:css:fix\" && npm run \"format:js:fix\"",
			"format:js": "npx prettier --check --no-error-on-unmatched-pattern $npm_package_scripts_paths_js",
			"format:js:fix": "npx prettier --write --no-error-on-unmatched-pattern $npm_package_scripts_paths_js",
			"lint": "npm run \"lint:css\" && npm run \"lint:js\"",
			"lint:css": "npx stylelint \"src/block/editor/scss/*.scss\" \"src/block/frontend/scss/*.scss\"",
			"lint:css:fix": "npx stylelint --fix $npm_package_scripts_paths_scss",
			"lint:fix": "npm run \"lint:css:fix\" && npm run \"lint:js:fix\"",
			"lint:js": "npx eslint --no-error-on-unmatched-pattern \"*.{js,ts,jsx,tsx}\" $npm_package_scripts_paths_js",
			"lint:js:fix": "npx eslint --fix --no-error-on-unmatched-pattern \"*.{js,ts,jsx,tsx}\" $npm_package_scripts_paths_js",
		},
		// Default value if build/index.js, we use dist/main.js
		customPackageJSON: {
			main: 'dist/main.js',
		},
		// Adds an additional folder inside src when scaffolding.
		// Default is src.
		folderName: 'src/block',
		transformer: (view) => {

			const {
				slug,title,namespace, textdomain
			} = view;

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
			}
		},
		// For older node versions (like node 16)
		// wpScripts: false,
		// npmDevDependencies: ['@wordpress/scripts@27.9.0', 'prettier', 'stylelint@15.10.3', 'stylelint-config-standard@34.0.0', 'stylelint-webpack-plugin@4.1.1', 'slash', 'eslint', 'eslint-config-prettier', 'eslint-config-standard', 'eslint-plugin-jsx', 'eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-webpack-plugin'],
		// For newer node versions (above 20)
		wpScripts: true,
		npmDevDependencies: ['prettier', 'stylelint', 'stylelint-config-standard', 'stylelint-webpack-plugin', 'slash', 'eslint@^8.0.1', 'eslint-config-prettier', 'eslint-config-standard', 'eslint-plugin-jsx', 'eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-webpack-plugin']

	},
	// Copy the plugin-templates to the root of the project folder where the template is used
	pluginTemplatesPath: join(__dirname, 'plugin-templates'),
	// Copy the block-templates to the root of the project folder where the template is used, adds src/block, so path becomes plugin>src/block/{files-from-block-templates}
	blockTemplatesPath: join(__dirname, 'block-templates'),
};
