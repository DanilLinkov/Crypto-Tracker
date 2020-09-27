import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import TimeFrameConxtext from "./TimeFrameContext";

export default function TimeButton({ name }) {
  const { timeFrame, changeContext } = useContext(TimeFrameConxtext);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        timeFrame === name ? styles.selected : styles.unSelected,
      ]}
      onPress={() => changeContext(name)}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  selected: {
    backgroundColor: "green",
  },
  unSelected: {
    backgroundColor: "red",
  },
});
