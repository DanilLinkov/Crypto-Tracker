import React from "react";
import TokenCard from "./components/TokenCard";
import { Image, StyleSheet, Text, View } from "react-native";
import TokenCardsContainer from "./components/TokenCardsContainer";
import TokenScreen from "./screens/TokenScreen";
import MainScreen from "./screens/MainScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tracker"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TokenPage"
          component={TokenScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
