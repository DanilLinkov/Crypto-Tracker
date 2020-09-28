import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";

import { TimeFrameProvider } from "./components/Utilities/TimeFrameContext";
import TokenScreen from "./components/screens/TokenScreen";
import MainScreen from "./components/screens/MainScreen";
import Stack from "./components/Utilities/Stack";
import NavigatorThemes from "./components/Utilities/NavigatorThemes";
import useDarkOrLightTheme from "./components/Hooks/useDarkOrLightTheme";

export default function App() {
  const theme = useDarkOrLightTheme();
  const [timeFrame, setTimeFrame] = useState("month");

  const changeTimeFrameContext = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <TimeFrameProvider value={{ timeFrame, changeTimeFrameContext }}>
      <NavigationContainer
        theme={
          theme === "dark"
            ? NavigatorThemes.darkTheme
            : NavigatorThemes.lightTheme
        }
      >
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
