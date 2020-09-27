import React, { useState } from "react";
import TokenCard from "./components/TokenCard";
import { Image, StyleSheet, Text, View } from "react-native";
import TokenScreen from "./screens/TokenScreen";
import MainScreen from "./screens/MainScreen";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
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
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

  const changeTimeFrameContext = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const changeThemeContext = () => {
    setDarkThemeEnabled(!darkThemeEnabled);
  };

  return (
    <ThemeProvider value={{ darkThemeEnabled, changeThemeContext }}>
      <TimeFrameProvider value={{ timeFrame, changeTimeFrameContext }}>
        <NavigationContainer theme={darkThemeEnabled ? darkTheme : lightTheme}>
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
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
