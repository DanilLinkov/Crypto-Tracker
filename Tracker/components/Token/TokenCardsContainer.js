import React, { useContext } from "react";
import { FlatList } from "react-native";

import TimeFrameConxtext from "../Utilities/TimeFrameContext";
import TokenCard from "./TokenCard";

export default function TokenCardsContainer({ data, refresh, refreshing }) {
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
