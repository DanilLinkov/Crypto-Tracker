import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./Screen";
import TokenCard from "./TokenCard";

const DATA = [
  {
    logo: "https://static.sylo.io/tokens/sylo.png",
    title: "Sylo1",
  },
  {
    logo: "https://static.sylo.io/tokens/sylo.png",
    title: "Sylo2",
  },
  {
    logo: "https://static.sylo.io/tokens/sylo.png",
    title: "Sylo3",
  },
];

export default function TokenCardsContainer({ data }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TokenCard
      name={item.name}
      icon={item.icon}
      id={item.id}
      symbol={item.symbol}
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
