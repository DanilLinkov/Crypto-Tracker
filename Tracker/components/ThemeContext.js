import React from "react";

const ThemeContext = React.createContext({
  dark: false,
  changeContext: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext;
