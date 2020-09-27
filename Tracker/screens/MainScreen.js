import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tokensApi from "../api/tokensApi";
import MainScreenHeader from "../components/MainScreenHeader";
import Screen from "../components/Screen";
import { TimeFrameProvider } from "../components/TimeFrameContext";
import TimeSelector from "../components/TimeSelector";
import TokenCardsContainer from "../components/TokenCardsContainer";

export default function MainScreen() {
  const [tokenList, setTokenList] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    loadTokens();
  }, [searchFilter]);

  const loadTokens = async () => {
    const response = await tokensApi.getTokens();

    const filteredResponse = [];

    response.data.forEach((token) => {
      if (
        setSearchFilter.length > 0 &&
        token.name.toLowerCase().includes(searchFilter.toLocaleLowerCase())
      ) {
        filteredResponse.push({
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          icon: token.icon_address,
        });
      } else if (setSearchFilter.length < 1) {
        filteredResponse.push({
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          icon: token.icon_address,
        });
      }
    });

    setTokenList(filteredResponse);
  };

  return (
    <Screen styleProp={styles.mainScreenContainer}>
      <View>
        <MainScreenHeader onChange={setSearchFilter} />
      </View>
      <View>
        <TimeSelector />
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
