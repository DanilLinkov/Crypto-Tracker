import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../Utilities/Screen";
import TimeFrameConxtext from "../Utilities/TimeFrameContext";
import TokenCard from "./TokenCard";

export default function TokenCardsContainer({ data, refresh, refreshing }) {
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
      showsVerticalScrollIndicator={false}
      onRefresh={() => refresh(true)}
      refreshing={refreshing}
    />
  );
}

const styles = StyleSheet.create({
  tokenCardsContainer: {
    width: 360,
  },
});
