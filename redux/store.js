import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware, createStore } from "redux";

import rootSaga from "./saga";
import rootReducer, { exampleInitialState } from "./reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: "templatehereapp",
  storage: storage,
  whitelist: ["dataUser"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState = exampleInitialState, { isServer }) {
  let store;
  const sagaMiddleware = createSagaMiddleware(); // for using redux-saga
  
  if (isServer) {
    store = createStore(
      rootReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    );
  } else {
    store = createStore(
      persistedReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    );
    store.__persistor = persistStore(store);
  }

  store.sagaTask = sagaMiddleware.run(rootSaga); // start saga

  return store;
}

export default configureStore;
