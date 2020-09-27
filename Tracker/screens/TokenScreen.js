import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import TimeFrameConxtext from "../components/TimeFrameContext";
import TimeSelector from "../components/TimeSelector";
import TokenCard from "../components/TokenCard";

export default function TokenScreen() {
  const route = useRoute();
  const { id, symbol, market_cap, volume_24h } = route.params;
  const timeFrame = useContext(TimeFrameConxtext);

  return (
    <Screen>
      <TimeSelector />
      <View style={styles.tokenCardContainer}>
        <TokenCard
          id={id}
          symbol={symbol}
          disabled={true}
          timeFrame={timeFrame.timeFrame}
        />
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
