import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import * as Animate from "react-native-animatable";
import Colours from "./Colours";

export default function MainScreenHeader({ onChange }) {
  const [show, setShow] = useState(false);

  return (
    <View style={!show ? styles.container : styles.headerContainer}>
      <View></View>
      <View>
        {!show ? <Text style={styles.headerTitle}>Tracker</Text> : null}
      </View>
      <View>
        {!show ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setShow(true);
            }}
          >
            <View style={styles.searchIcon}>
              <Ionicons name="ios-search" size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <Animate.View animation="slideInRight" duration={100}>
            <View style={styles.searchContainer}>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => onChange(text)}
                />
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  setShow(false);
                  onChange("");
                }}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={styles.closeIcon}
                />
              </TouchableWithoutFeedback>
            </View>
          </Animate.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 340,
    height: 65,
  },
  headerTitle: {
    color: Colours.light.primary,
    fontSize: 18,
    marginLeft: 65,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 400,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 340,
    height: 65,
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  searchIcon: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
