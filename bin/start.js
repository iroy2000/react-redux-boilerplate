import shell from 'shelljs';
import { SHOULD_BUILD } from './shouldBuild';

// Is the app in production mode
const command = SHOULD_BUILD ? 'build' : 'dev';

// Run the appropriate npm command
shell.exec(`npm run ${command}`);
