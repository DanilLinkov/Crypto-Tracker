import React from "react";

const ThemeContext = React.createContext({
  theme: false,
  changeContext: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext;
