import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tokensApi from "../api/tokensApi";
import Screen from "../components/Screen";
import TokenCardsContainer from "../components/TokenCardsContainer";

export default function MainScreen() {
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    const response = await tokensApi.getTokens();

    const filteredResponse = [];

    response.data.forEach((token) => {
      filteredResponse.push({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        icon: token.icon_address,
      });
    });

    setTokenList(filteredResponse);
  };

  return (
    <Screen styleProp={styles.mainScreenContainer}>
      <View>
        <Text>Buttons</Text>
      </View>
      <View>
        <TokenCardsContainer data={tokenList} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreenContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
});
