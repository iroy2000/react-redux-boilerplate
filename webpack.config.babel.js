import { SHOULD_BUILD } from './bin/shouldBuild';
// Defining config variables
// ================================================================================

// If it's production or release, we use the production config,
// Otherwise, use the development config
// please looked at ./bin/shouldBuild.js
const webpackConfig = (SHOULD_BUILD)
                    ? require('./webpack.config.prod')
                    : require('./webpack.config.dev');

export default webpackConfig;
