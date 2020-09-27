import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import tokensApi from "../api/tokensApi";
import { useNavigation } from "@react-navigation/native";
import Colours from "./Colours";
import GradientGraph from "./GradientGraph";

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
    loadTokenPrice();
  }, [timeFrame]);

  const loadTokenPrice = async () => {
    let isSubscribed = true;
    setLoading(true);
    await tokensApi.getTokenPrice(id, timeFrame).then((response) => {
      if (isSubscribed) {
        setTokenPrice(response.data);
        setLoading(false);
      }
    });
    return () => (isSubscribed = false);
  };

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

    return `${precentageChange}% (\$${currencyChange})`;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() =>
        navigation.navigate("TokenPage", {
          id: id,
          symbol: symbol,
          name: name,
          timeFrame: timeFrame,
          market_cap: tokenPrice.market_cap,
          volume_24h: tokenPrice.volume_24h,
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
            {!loading ? (
              <React.Fragment>
                <Text
                  style={[
                    styles.mainPriceText,
                    icon || name ? { fontSize: 13 } : { fontSize: 18 },
                  ]}
                >{`\$${tokenPrice.rate.toFixed(4)}`}</Text>
                <Text
                  style={
                    calculatePriceChange().precentageChange > 0
                      ? styles.greenPriceText
                      : styles.redPriceText
                  }
                >
                  {getPriceString()}
                </Text>
              </React.Fragment>
            ) : null}
          </View>
        </View>
        <View style={styles.graphContainer}>
          {!loading ? (
            <GradientGraph
              data={getGraphPoints()}
              gradientDisabled={icon || name}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
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

// {!loading ? (
//   <LineChart
//     style={{
//       height: 100,
//     }}
//     data={getGraphPoints()}
//     curve={shape.curveNatural}
//     svg={{
//       strokeWidth: 2,
//       stroke: Colours.light.graph,
//       strokeOpacity: 0.6,
//     }}
//     contentInset={{ top: 30, bottom: 30 }}
//   ></LineChart>
// ) : (
//   <Text>loading...</Text>
// )}
