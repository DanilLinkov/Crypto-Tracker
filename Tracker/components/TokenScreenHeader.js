import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colours from "./Colours";
import { useNavigation } from "@react-navigation/native";

export default function TokenScreenHeader({ name, icon }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="left" size={24} color="#495162" />
      </TouchableOpacity>
      <View style={styles.titleIconContainer}>
        <Image
          source={{
            uri: icon,
            width: 36,
            height: 36,
          }}
        />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    marginLeft: 21,
    marginRight: 21,
  },
  nameText: {
    color: Colours.light.primary,
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
  },
  titleIconContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});
