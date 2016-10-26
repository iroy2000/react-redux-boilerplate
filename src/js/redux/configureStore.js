import promiseMiddleware from 'redux-promised';
import { routerMiddleware } from 'react-router-redux';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import rootReducer from './rootReducers';

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  return typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
};

export default function configureStore(initialState, history) {
  const middleware = applyMiddleware(promiseMiddleware, routerMiddleware(history));

  const composedStoreEnhancer = compose(
    middleware, reduxDevTool()
  );

  const store = composedStoreEnhancer(createStore)(
    rootReducer, initialState
  );

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      const nextRootReducer = require('./rootReducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
