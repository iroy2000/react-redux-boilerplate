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
  const middleware = applyMiddleware(routerMiddleware(history));

  const composedStoreEnhancer = compose(
    middleware, reduxDevTool()
  );

  const store = composedStoreEnhancer(createStore)(
    rootReducer, initialState
  );

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(require('./rootReducers'));
    });
  }

  return store;
}
