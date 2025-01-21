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
		// We need the --webpack-copy-php to copy the render file to the dist folder.
		// Therefor we override the existing scripts created by @wordpress/create-block
		customScripts: {
			build: 'wp-scripts build --webpack-copy-php',
			start: 'wp-scripts start --webpack-copy-php',
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


		}

	},
	// Copy the plugin-templates to the root of the project folder where the template is used
	pluginTemplatesPath: join(__dirname, 'plugin-templates'),
	// Copy the block-templates to the root of the project folder where the template is used, adds src/block, so path becomes plugin>src/block/{files-from-block-templates}
	blockTemplatesPath: join(__dirname, 'block-templates'),
};
