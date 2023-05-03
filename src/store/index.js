import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";

const middleware = [thunk];
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["bus", "student", "driver", "parent"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  withDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store);

export {
  store,
  persistor
};