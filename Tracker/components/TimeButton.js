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
      hitSlop={{ top: 10, left: 10, bottom: 0, right: 10 }}
    >
      <Text style={timeFrame === name ? styles.selected : styles.unSelected}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 21,
    marginLeft: 22,
    marginRight: 22,
  },
  selected: {
    color: Colours.light.graph,
    alignSelf: "center",
    fontSize: 15,
  },
  unSelected: {
    color: Colours.light.secondary,
    alignSelf: "center",
    fontSize: 15,
  },
});
