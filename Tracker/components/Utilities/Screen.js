import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Conststants from "expo-constants";

/**
 * This is used to create a safe space top margin for a screen
 */
export default function Screen({ children, styleProp }) {
  return (
    <SafeAreaView style={[styles.screen, styleProp]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Conststants.statusBarHeight,
  },
});
