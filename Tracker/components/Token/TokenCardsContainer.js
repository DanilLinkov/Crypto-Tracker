import React, { useContext } from "react";
import { FlatList } from "react-native";

import TimeFrameConxtext from "../Utilities/TimeFrameContext";
import TokenCard from "./TokenCard";

/**
 * This component is used to hold the list of token cards in a flat list
 * @param {graph data of token prices, refresh the list function, boolean for whether its refreshing or not} param0
 */
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
