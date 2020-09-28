import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import NumberFormat from "react-number-format";

import Colours from "../Utilities/Colours";
import GradientGraph from "./GradientGraph";
import useTokenPrice from "../Hooks/useTokenPrice";

export default function TokenCard({
  icon,
  name,
  id,
  symbol,
  timeFrame,
  stylesProp,
  disabled = false,
}) {
  const [tokenPrice, loading] = useTokenPrice(id, timeFrame);

  const navigation = useNavigation();
  const navigationTheme = useTheme();

  const theme = navigationTheme.dark ? Colours.dark : Colours.light;
  let iconTheme = "";
  if (icon) {
    iconTheme = navigationTheme.dark ? icon.dark : icon.light;
  }

  const getGraphPoints = () => {
    const graphPoints = [];
    let count = 0;
    tokenPrice.history.forEach((point) => {
      if (count % 10 === 0 && point.rate > 0) {
        graphPoints.push(point.rate);
      }
      count = count + 1;
    });

    return graphPoints;
  };

  const calculatePriceChange = () => {
    let arraySize = tokenPrice.history.length;

    const newPrice = tokenPrice.history[arraySize - 1].rate;

    let rewriteCount = 0;
    while (tokenPrice.history[rewriteCount].rate === -1) {
      rewriteCount = rewriteCount + 1;
    }
    const oldPrice = tokenPrice.history[rewriteCount].rate;

    let currencyChange = (newPrice - oldPrice).toFixed(3);
    let precentageChange = (((newPrice - oldPrice) * 100) / oldPrice).toFixed(
      2
    );

    return { currencyChange, precentageChange };
  };

  const getPriceString = () => {
    const { currencyChange, precentageChange } = calculatePriceChange();

    return (
      <NumberFormat
        renderText={(text) => (
          <Text
            style={[
              precentageChange > 0
                ? [styles.precentText, { color: theme.green }]
                : [styles.precentText, { color: theme.red }],
            ]}
          >
            {precentageChange}% ({text})
          </Text>
        )}
        value={currencyChange}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      hitSlop={{ top: -16 }}
      onPress={() =>
        navigation.navigate("TokenPage", {
          id: id,
          symbol: symbol,
          name: name,
          timeFrame: timeFrame,
          market_cap: tokenPrice.market_cap,
          volume_24h: tokenPrice.volume_24h,
          icon: icon,
        })
      }
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background, borderColor: theme.border },
          stylesProp,
          icon || name
            ? { width: 343, height: 140 }
            : { width: 335, height: 185, paddingTop: 12 },
        ]}
      >
        {!loading ? (
          <React.Fragment>
            <View
              style={
                icon || name
                  ? styles.headerContainer
                  : {
                      flex: 1,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "row",
                    }
              }
            >
              <View style={styles.logoTitleContainer}>
                {iconTheme !== "" ? (
                  <Image
                    style={{ marginRight: 12 }}
                    source={{
                      uri: iconTheme,
                      width: 36,
                      height: 36,
                    }}
                  />
                ) : null}
                <Text style={[styles.text, { color: theme.primary }]}>
                  {name}
                </Text>
              </View>
              <View
                style={
                  icon || name
                    ? styles.priceContainer
                    : styles.priceContainerNoTitle
                }
              >
                <NumberFormat
                  renderText={(text) => (
                    <Text
                      style={[
                        styles.text,
                        { color: theme.primary },
                        icon || name ? { fontSize: 15 } : { fontSize: 18 },
                      ]}
                    >
                      {text}
                    </Text>
                  )}
                  value={tokenPrice.rate.toFixed(4)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {getPriceString()}
              </View>
            </View>
            <View style={styles.graphContainer}>
              <GradientGraph
                data={getGraphPoints()}
                gradientDisabled={icon || name}
              />
            </View>
          </React.Fragment>
        ) : (
          <ActivityIndicator size="large" color={Colours.light.graph} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 16,
    overflow: "hidden",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
  },
  logoTitleContainer: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  priceContainerNoTitle: {
    flexDirection: "column",
    alignItems: "center",
  },
  graphContainer: {
    flex: 2,
  },
  text: {
    fontSize: 15,
  },
  precentText: {
    fontSize: 12,
  },
});
