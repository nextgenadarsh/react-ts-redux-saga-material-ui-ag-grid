import * as React from "react";
import { render } from "react-dom";

// import $ from 'jquery';
// import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider } from "react-redux";
import configureStore from "./redux/store";

import App from "./app";

import * as ServiceWorker from "./service-worker";

const rootElement = document.getElementById("root");
const rootComponent = (
  <Provider store={configureStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

render(rootComponent, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
