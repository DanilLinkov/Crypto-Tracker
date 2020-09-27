import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colours from "./Colours";
import TimeFrameConxtext from "./TimeFrameContext";

export default function TimeButton({ name }) {
  const { timeFrame, changeContext } = useContext(TimeFrameConxtext);

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => changeContext(name)}
    >
      <Text style={timeFrame === name ? styles.selected : styles.unSelected}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 20,
  },
  selected: {
    color: Colours.light.graph,
    alignSelf: "center",
  },
  unSelected: {
    color: Colours.light.secondary,
    alignSelf: "center",
  },
});
