import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import TokenCardsContainer from "../components/TokenCardsContainer";

export default function MainScreen() {
  return (
    <Screen styleProp={styles.mainScreenContainer}>
      <View>
        <Text>Buttons</Text>
      </View>
      <View>
        <TokenCardsContainer />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreenContainer: {
    alignItems: "center",
  },
});
