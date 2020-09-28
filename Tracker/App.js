import React, { useEffect, useState } from "react";
import { Appearance, Image, StyleSheet, Text, View } from "react-native";
import TokenScreen from "./screens/TokenScreen";
import MainScreen from "./screens/MainScreen";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { TimeFrameProvider } from "./components/TimeFrameContext";

const Stack = createStackNavigator();

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

export default function App() {
  const [timeFrame, setTimeFrame] = useState("month");
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const initialTheme = Appearance.getColorScheme(); // Works as expected
    setTheme(initialTheme || "light");

    const listener = () => {
      const newTheme = Appearance.getColorScheme();
      setTheme(newTheme || "light");
    };

    const subscription = Appearance.addChangeListener(listener);
    return () => {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  const changeTimeFrameContext = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <TimeFrameProvider value={{ timeFrame, changeTimeFrameContext }}>
      <NavigationContainer theme={theme === "dark" ? darkTheme : lightTheme}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="Tracker"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TokenPage"
            component={TokenScreen}
            options={({ route }) => ({
              title: route.params.name,
              headerShown: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TimeFrameProvider>
  );
}

const styles = StyleSheet.create({});
