import { useState, useEffect } from "react";
import { Appearance } from "react-native";

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
