import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";

import sagas from "./sagas";
import rootReducer from "./rootReducers";

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  return typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;
};

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware);

  const composedStoreEnhancer = compose(
    middleware,
    reduxDevTool()
  );

  const store = composedStoreEnhancer(createStore)(rootReducer, initialState);

  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept("./rootReducers", () => {
      store.replaceReducer(require("./rootReducers"));
    });
  }

  return store;
}
