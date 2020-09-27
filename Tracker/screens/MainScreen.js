import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import tokensApi from "../api/tokensApi";
import Colours from "../components/Colours";
import MainScreenHeader from "../components/MainScreenHeader";
import Screen from "../components/Screen";
import TimeSelector from "../components/TimeSelector";
import TokenCardsContainer from "../components/TokenCardsContainer";

export default function MainScreen() {
  const [tokenList, setTokenList] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTokens();
  }, [searchFilter]);

  const loadTokens = async () => {
    setLoading(true);
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

    setLoading(false);
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
        {!loading ? (
          <TokenCardsContainer data={tokenList} />
        ) : (
          <ActivityIndicator
            size="large"
            color={Colours.light.graph}
            style={styles.loadingIndicator}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainScreenContainer: {
    alignItems: "center",
    marginBottom: 200,
  },
  loadingIndicator: {
    marginTop: 100,
  },
});
