import { useState, useEffect } from "react";
import { Appearance } from "react-native";

/**
 * This hook is used to ecapsulate all the state management around the theme
 * of this app. It returns the current theme of the application and adds a listener changing
 * the theme returned when the user changes their devices theme.
 */
export default function useDarkOrLightTheme() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const initialTheme = Appearance.getColorScheme();
    setTheme(initialTheme || "light");

    const listener = () => {
      const newTheme = Appearance.getColorScheme();
      setTheme(newTheme || "light");
    };

    Appearance.addChangeListener(listener);
    return () => {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  return theme;
}
