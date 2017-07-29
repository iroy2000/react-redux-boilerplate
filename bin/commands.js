const shell = require('shelljs');
const config = require('config');
const colors = require('colors');

const host = config.get('host') || 'localhost';
const port = config.get('port') || '8080';

const option = process.argv[2];

switch (option) {
  case 'lint':
    shell.exec('cross-env eslint src/js/** server/** --format node_modules/eslint-friendly-formatter . --ext .js --ext .jsx  --cache; exit 0');
    break;
  case 'dev':
    shell.exec(`cross-env HOST=${host} PORT=${port} webpack-dev-server --hot --progress --inline --colors --content-base ./docroot`);
    break;
  case 'build':
    shell.exec(`cross-env rimraf docroot && webpack --progress`);
    break;
  default:
    // If the app type is invalid, stop execution of the file.
    console.log(colors.green('Invalid option.'));
    console.log(colors.green('See README.md for more details.'));
    return;
}
