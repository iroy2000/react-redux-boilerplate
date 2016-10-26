import shell from 'shelljs';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_RELEASE = process.env.NODE_ENV === 'release';

// Is the app in production mode
const command = (IS_PRODUCTION || IS_RELEASE) ? 'build' : 'dev';

// Run the appropriate npm command
shell.exec(`npm run ${command}`);
