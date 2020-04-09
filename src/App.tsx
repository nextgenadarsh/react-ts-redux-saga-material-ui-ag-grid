import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.css";

import { setAdminAction } from "./redux/actions";

const HomePage = lazy(() => import("./pages/home"));
const TodoPage = lazy(() => import("./pages/todo"));
const MaterialUiPage = lazy(() => import("./pages/material-ui"));
const ContactPage = lazy(() => import("./pages/contact"));

const App = props => {
  return (
    <div className="App">
      <div className="alert alert-success">
        <strong>
          ReactJs + TypeScript + Redux Saga + Material UI + AgGrid
        </strong>
      </div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="navbar-brand" to="/">
            React Demo App
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todo">
                  Todo App
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/material-ui">
                  Material UI
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                Search
              </button>
            </form>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => props.setAdmin(!props.userInfo.isAdmin)}
          >
            {props.userInfo.isAdmin ? "Connect Again" : "Connect to Web Socket"}
          </button>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/todo" component={TodoPage} />
            <Route path="/material-ui" component={MaterialUiPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    setAdmin: payload => setAdminAction(dispatch, payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
