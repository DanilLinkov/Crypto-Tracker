import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Animate from "react-native-animatable";
import Colours from "./Colours";
import { useTheme } from "@react-navigation/native";

export default function MainScreenHeader({ onChange }) {
  const [show, setShow] = useState(false);
  const navigatorTheme = useTheme();

  const theme = navigatorTheme.dark ? Colours.dark : Colours.light;

  return (
    <View style={!show ? styles.container : styles.headerContainer}>
      <View></View>
      <View>
        {!show ? (
          <Text style={[styles.headerTitle, { color: theme.primary }]}>
            Tracker
          </Text>
        ) : null}
      </View>
      <View>
        {!show ? (
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
            hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <View style={styles.searchIcon}>
              <Ionicons name="ios-search" size={24} color={theme.primary} />
            </View>
          </TouchableOpacity>
        ) : (
          <Animate.View animation="slideInRight" duration={100}>
            <View style={styles.searchContainer}>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => onChange(text)}
                  autoFocus={true}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                  onChange("");
                }}
                hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
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
