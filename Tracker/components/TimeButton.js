import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colours from "./Colours";
import TimeFrameConxtext from "./TimeFrameContext";

export default function TimeButton({ name }) {
  const { timeFrame, changeTimeFrameContext } = useContext(TimeFrameConxtext);
  const navigatorTheme = useTheme();

  const theme = navigatorTheme.dark ? Colours.dark : Colours.light;

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => changeTimeFrameContext(name)}
      hitSlop={{ top: 10, left: 10, bottom: 0, right: 10 }}
    >
      <Text
        style={[
          timeFrame === name
            ? [styles.selected, { color: theme.graph }]
            : [styles.unSelected, { color: theme.secondary }],
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 22,
    marginRight: 22,
  },
  selected: {
    fontSize: 15,
  },
  unSelected: {
    fontSize: 15,
  },
});
