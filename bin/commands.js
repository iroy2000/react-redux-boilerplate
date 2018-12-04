const shell = require('shelljs');
const config = require('config');
const colors = require('colors');

const option = process.argv[2];

// The following will allow you to add your own
// - pre process
// - post process
// - parallel process
// - logging
//
// You can add your process here and have package.json to proxy your command
// Please look at package.json -> "scripts" section
switch (option) {
  case 'lint':
    shell.exec('cross-env eslint --fix src/js/** --format node_modules/eslint-friendly-formatter . --ext .js --ext .jsx  --cache; exit 0');
    break;
  case 'dev':
    shell.exec(`cross-env webpack-dev-server --config webpack.config.dev-server.babel.js --hot --progress --no-info --inline --colors`);
    break;
  case 'build':
    shell.exec(`cross-env rimraf docroot && webpack --config webpack.config.build.babel.js --progress --display-error-details`);
    break;
  default:
    // If the app type is invalid, stop execution of the file.
    console.log(colors.green('Invalid option.'));
    console.log(colors.green('See README.md for more details.'));
    return;
}
