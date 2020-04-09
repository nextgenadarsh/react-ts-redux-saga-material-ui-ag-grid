import * as React from "react";
import { render } from "react-dom";

// import $ from 'jquery';
// import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider } from "react-redux";
import configureStore from "./redux/store";

import App from "./App";

const rootElement = document.getElementById("root");
const rootComponent = (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

render(rootComponent, rootElement);
