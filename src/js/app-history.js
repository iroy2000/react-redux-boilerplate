// This is recommended way ( html5 browser history api )
// But for demo purpose, we diactivate that and use hashHistory instead
// In order for your side to use this html history api, you need to do the following
// 1) uncomment this line
// 2) comment the line that says `createHashHistory'`
// 3) go to webpack.config.dev-server and change `historyApiFallback` to true
//
// Please note that by using html5 history api, you need to setup your
// static server to handle url accordingly. If you are not sure what it is, please
// don't make changes in here.
// import createHistory from 'history/createBrowserHistory'

import { createHashHistory } from 'history';

const history = createHashHistory();

// Exposing history for deep integration needs
// For example, saga and utilities
export { history };
