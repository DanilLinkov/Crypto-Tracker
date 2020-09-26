import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import TokenCard from "../components/TokenCard";

export default function TokenScreen() {
  const route = useRoute();
  const { id, symbol, market_cap, volume_24h } = route.params;

  return (
    <Screen>
      <View style={styles.tokenCardContainer}>
        <TokenCard id={id} symbol={symbol} disabled={true} />
      </View>
      <View style={styles.textContainer}>
        <Text>Information</Text>
        <View>
          <Text>Symbol: {symbol}</Text>
          <Text>Market cap: ${market_cap}</Text>
          <Text>24h Volume: ${volume_24h}</Text>
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
