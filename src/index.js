import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from 'redux-logger';

import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { fetchCurrentUser, userFetched } from './actions/users';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

if (localStorage.DDAdventuresLeagueHub) {
  setAuthorizationHeader(localStorage.DDAdventuresLeagueHub);
  store.dispatch(fetchCurrentUser());
} else {
  store.dispatch(userFetched({}));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
