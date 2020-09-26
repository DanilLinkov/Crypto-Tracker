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

export default function TokenCardsContainer() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Sylo")}>
      <TokenCard title={item.title} logo={item.logo} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    />
  );
}

const styles = StyleSheet.create({
  tokenCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
