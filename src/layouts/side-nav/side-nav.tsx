import React from "react";
import { Link } from "react-router-dom";

import "./side-nav.css";

const SideNav = () => {
  const routes = [
    { path: "/", label: "Home", bgColor: "red" },
    { path: "/hooks", label: "Hooks", bgColor: "blue" },
    { path: "/material-ui", label: "Material UI", bgColor: "green" },
    { path: "/contact", label: "Contact", bgColor: "magenta" }
  ];
  return (
    <div className="side-nav">
      {routes.map((route, index) => (
        <Link
          key={index}
          className="side-nav-menu"
          style={{
            top: 200 + index * 65,
            backgroundColor: route.bgColor
          }}
          to={route.path}
        >
          {route.label}
          <i className="fa fa-fw fa-home" />
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
