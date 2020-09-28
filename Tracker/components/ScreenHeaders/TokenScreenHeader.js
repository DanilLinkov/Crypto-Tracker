import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Colours from "../Utilities/Colours";
import { useNavigation } from "@react-navigation/native";

/**
 *
 * @param {Name of the token, Icon object with dark and normal png uri values, boolean value for whether the theme is dark } param0
 */
export default function TokenScreenHeader({ name, icon, isDark }) {
  const navigation = useNavigation();

  const theme = isDark ? Colours.dark : Colours.light;
  const iconTheme =
    isDark && icon && icon.dark && icon.light ? icon.dark : icon.light;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <AntDesign name="left" size={24} color={theme.primary} />
      </TouchableOpacity>
      <View style={styles.titleIconContainer}>
        <Image
          source={{
            uri: iconTheme,
            width: 36,
            height: 36,
          }}
        />
        <Text style={[styles.nameText, { color: theme.primary }]}>{name}</Text>
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
    alignSelf: "stretch",
  },
  nameText: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
  },
  titleIconContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});
