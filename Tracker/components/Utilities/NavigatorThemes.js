import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export default NavigatorThemes = {
  lightTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  },
  darkTheme: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  },
};
