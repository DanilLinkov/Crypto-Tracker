import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

export default function TokenCard({
  logo,
  title,
  priceHistory,
  timeFrame,
  stylesProp,
}) {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  return (
    <View style={[styles.container, stylesProp]}>
      <View
        style={
          logo || title
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
              uri: logo,
              width: 36,
              height: 36,
            }}
          />
          <Text>{title}</Text>
        </View>
        <View
          style={
            logo || title ? styles.priceContainer : styles.priceContainerNoTitle
          }
        >
          <Text>$0.0218</Text>
          <Text>+4.48% ($0.0097)</Text>
        </View>
      </View>
      <View style={styles.graphContainer}>
        <LineChart
          style={{
            height: 100,
          }}
          data={data}
          curve={shape.curveNatural}
          svg={{ strokeWidth: 2, stroke: "black" }}
          contentInset={{ top: 10, bottom: 10 }}
        ></LineChart>
      </View>
    </View>
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
