import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import TokenCard from "../components/TokenCard";

export default function TokenScreen() {
  return (
    <Screen>
      <View style={styles.tokenCardContainer}>
        <TokenCard />
      </View>
      <View style={styles.textContainer}>
        <Text>Information</Text>
        <View>
          <Text>Symbol: SYLO</Text>
          <Text>Market cap: $12738917239 NZD</Text>
          <Text>24h Volume: $234829374 NZD</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tokenCardContainer: {
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
});
