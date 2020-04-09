import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { ThemeContext, Themes } from "./providers/theme-provider";
import { connect } from "react-redux";
import "./styles.css";

import { setAdminAction } from "./redux/actions";

import SideNavLayout from "./layouts/side-nav-layout/side-nav-layout";
import ToggleSwitch from "./layouts/toggle-switch/toggle-switch";

const HomePage = lazy(() => import("./pages/home"));
const TodoPage = lazy(() => import("./pages/todo"));
const MaterialUiPage = lazy(() => import("./pages/material-ui"));
const ContactPage = lazy(() => import("./pages/contact"));

const App = props => {
  const [theme, setTheme] = useState("dark");

  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app">
      <div className="alert alert-success">
        <strong>
          ReactJs + TypeScript + Redux Saga + Material UI + AgGrid
        </strong>
      </div>
      <Router>
        <div className="pos-f-t">
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleFilters"
              aria-controls="navbarToggleFilters"
              aria-expanded="false"
              aria-label="Toggle filters"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <h3 className="navbar-brand" style={{ color: "white" }}>
              ReactJs Starter
            </h3>
            <button
              className="btn btn-warning"
              onClick={() => props.setAdmin(!props.userInfo.isAdmin)}
            >
              {props.userInfo.isAdmin
                ? "Connect Again"
                : "Connect to Web Socket"}
            </button>
            <div style={{ color: "white" }}>
              <ToggleSwitch theme={theme} onChange={handleToggleTheme} />
            </div>
          </nav>
          <div className="collapse navbar-collapse" id="navbarToggleFilters">
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
        </div>
        <ThemeContext.Provider
          value={theme === "dark" ? Themes.dark : Themes.light}
        >
          <SideNavLayout />
        </ThemeContext.Provider>
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
