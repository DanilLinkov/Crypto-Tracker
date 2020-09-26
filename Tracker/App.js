import React from "react";
import TokenCard from "./components/TokenCard";
import { Image, StyleSheet, Text, View } from "react-native";
import TokenCardsContainer from "./components/TokenCardsContainer";
import TokenScreen from "./screens/TokenScreen";
import MainScreen from "./screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tracker" component={MainScreen} />
        <Stack.Screen name="Sylo" component={TokenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
