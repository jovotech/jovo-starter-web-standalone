const { ProjectConfig } = require('@jovotech/cli-core');

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: v4.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
	endpoint: '${JOVO_WEBHOOK_URL}',
	plugins: [
		// Add Jovo CLI plugins here
	],
});

module.exports = project;
