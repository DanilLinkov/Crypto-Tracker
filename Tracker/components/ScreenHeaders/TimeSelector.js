import React from "react";
import { StyleSheet, View } from "react-native";
import TimeButton from "./TimeButton";

export default function TimeSelector({ styleProp }) {
  return (
    <View style={[styles.container, styleProp]}>
      <TimeButton name="all" />
      <TimeButton name="year" />
      <TimeButton name="month" />
      <TimeButton name="week" />
      <TimeButton name="day" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
