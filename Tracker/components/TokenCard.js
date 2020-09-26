import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import tokensApi from "../api/tokensApi";
import { useNavigation } from "@react-navigation/native";

export default function TokenCard({
  icon,
  name,
  id,
  symbol,
  stylesProp,
  disabled = false,
}) {
  const [tokenPrice, setTokenPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadTokenPrice();
  }, []);

  const loadTokenPrice = async () => {
    setLoading(true);
    const response = await tokensApi.getTokenPrice(id, "implement later");
    setTokenPrice(response.data);
    setLoading(false);
  };

  const getGraphPoints = () => {
    const graphPoints = [];
    let count = 0;
    tokenPrice.history.forEach((point) => {
      if (count % 10 === 0) {
        graphPoints.push(point.rate);
      }
      count = count + 1;
    });

    return graphPoints;
  };

  const calculatePriceChange = () => {
    let arraySize = tokenPrice.history.length;

    const newPrice = tokenPrice.history[arraySize - 1].rate;
    const oldPrice = tokenPrice.history[arraySize - 10].rate;

    let currencyChange = (newPrice - oldPrice).toFixed(3);
    let precentageChange = ((newPrice - oldPrice) / oldPrice).toFixed(3);

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
          market_cap: tokenPrice.market_cap,
          volume_24h: tokenPrice.volume_24h,
        })
      }
    >
      <View style={[styles.container, stylesProp]}>
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
            <Text>{name}</Text>
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
                <Text>{`\$${tokenPrice.rate.toFixed(4)}`}</Text>
                <Text>{calculatePriceChange()}</Text>
              </React.Fragment>
            ) : null}
          </View>
        </View>
        <View style={styles.graphContainer}>
          {!loading ? (
            <LineChart
              style={{
                height: 100,
              }}
              data={getGraphPoints()}
              curve={shape.curveNatural}
              svg={{ strokeWidth: 2, stroke: "black" }}
              contentInset={{ top: 20, bottom: 20 }}
            ></LineChart>
          ) : (
            <Text>loading...</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#F6F6F6",
    borderRadius: 15,
    color: "#20232a",
    width: 343,
    height: 140,
    padding: 10,
    marginTop: 16,
    overflow: "hidden",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
