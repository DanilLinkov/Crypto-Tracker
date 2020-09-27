import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./Screen";
import TimeFrameConxtext from "./TimeFrameContext";
import TokenCard from "./TokenCard";

export default function TokenCardsContainer({ data }) {
  const navigation = useNavigation();
  const timeFrame = useContext(TimeFrameConxtext);

  const renderItem = ({ item }) => (
    <TokenCard
      name={item.name}
      icon={item.icon}
      id={item.id}
      symbol={item.symbol}
      timeFrame={timeFrame.timeFrame}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  tokenCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
