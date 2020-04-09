import React from "react";

const Themes = {
  light: {
    color: "#000000",
    background: "#eeeeee"
  },
  dark: {
    color: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(Themes.light);

export { Themes, ThemeContext };
