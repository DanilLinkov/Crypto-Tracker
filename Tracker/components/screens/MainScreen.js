import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import tokensApi from "../api/tokensApi";
import Colours from "../Utilities/Colours";
import MainScreenHeader from "../ScreenHeaders/MainScreenHeader";
import Screen from "../Utilities/Screen";
import TimeSelector from "../ScreenHeaders/TimeSelector";
import TokenCardsContainer from "../Token/TokenCardsContainer";

export default function MainScreen() {
  const [tokenList, setTokenList] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTokens();
  }, [searchFilter, refreshing]);

  const loadTokens = async () => {
    setLoading(true);
    const response = await tokensApi.getTokens();

    const filteredResponse = [];

    response.data.forEach((token) => {
      if (
        (searchFilter.length > 0 &&
          token.name
            .toLowerCase()
            .includes(searchFilter.toLocaleLowerCase())) ||
        searchFilter.length < 1
      ) {
        filteredResponse.push({
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          icon: {
            dark: token.icon_address_dark,
            light: token.icon_address,
          },
        });
      }
    });

    setLoading(false);
    setRefreshing(false);
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
          <TokenCardsContainer
            data={tokenList}
            refresh={setRefreshing}
            refreshing={loading}
          />
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
