import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function MainScreenHeader({ onChange }) {
  const [show, setShow] = useState(false);

  return (
    <View style={!show ? styles.container : styles.searchingCointainer}>
      <View></View>
      <View>
        <Text>Tracker</Text>
      </View>
      <View>
        {!show ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setShow(true);
            }}
          >
            <Ionicons name="ios-search" size={24} color="black" />
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.closeIconContainer}>
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChange(text)}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setShow(false);
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 340,
  },
  searchingCointainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 400,
  },
  closeIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
});
