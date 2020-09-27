import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import tokensApi from "../api/tokensApi";
import { useNavigation } from "@react-navigation/native";
import Colours from "./Colours";
import GradientGraph from "./GradientGraph";
import NumberFormat from "react-number-format";

export default function TokenCard({
  icon,
  name,
  id,
  symbol,
  timeFrame,
  stylesProp,
  disabled = false,
}) {
  const [tokenPrice, setTokenPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    tokensApi.getTokenPrice(id, timeFrame).then((response) => {
      if (isSubscribed) {
        setTokenPrice(response.data);
        setLoading(false);
      }
    });
    return () => (isSubscribed = false);
  }, [timeFrame]);

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
            style={
              precentageChange > 0 ? styles.greenPriceText : styles.redPriceText
            }
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
          stylesProp,
          icon || name
            ? { width: 343, height: 140 }
            : { width: 335, height: 185 },
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
                <Image
                  style={{ marginRight: 12 }}
                  source={{
                    uri: icon,
                    width: 36,
                    height: 36,
                  }}
                />
                <Text style={styles.nameText}>{name}</Text>
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
                        styles.mainPriceText,
                        icon || name ? { fontSize: 13 } : { fontSize: 18 },
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
    backgroundColor: Colours.light.background,
    borderWidth: 2,
    borderColor: Colours.light.border,
    borderRadius: 15,
    marginTop: 16,
    overflow: "hidden",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
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
  nameText: {
    color: Colours.light.primary,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 14,
  },
  mainPriceText: {
    color: Colours.light.primary,
    fontWeight: "bold",
  },
  greenPriceText: {
    color: Colours.light.green,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  redPriceText: {
    color: Colours.light.red,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
});
