import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./side-nav-layout.css";

import SideNav from "../side-nav/side-nav";

const HomePage = lazy(() => import("../../pages/home"));
const HooksPage = lazy(() => import("../../pages/hooks"));
const MaterialUiPage = lazy(() => import("../../pages/material-ui"));
const TestPage =  lazy(() => import("../../pages/test"));
const ContactPage = lazy(() => import("../../pages/contact"));


const SideNavLayout = () => {
  return (
    <Router>
      <SideNav />
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/hooks" component={HooksPage} />
            <Route path="/material-ui" component={MaterialUiPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/test" component={TestPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default SideNavLayout;
