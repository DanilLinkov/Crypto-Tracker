import { useRoute, useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../Utilities/Screen";
import TimeFrameConxtext from "../Utilities/TimeFrameContext";
import TimeSelector from "../ScreenHeaders/TimeSelector";
import TokenCard from "../Token/TokenCard";
import TokenScreenHeader from "../ScreenHeaders/TokenScreenHeader";
import NumberFormat from "react-number-format";
import Colours from "../Utilities/Colours";

/**
 * This is the token screen component used to display the specific token holding
 * the token header, time frame selection bar and the token card with its information.
 */
export default function TokenScreen() {
  const route = useRoute();
  const { id, symbol, market_cap, volume_24h, icon, name } = route.params;

  const timeFrame = useContext(TimeFrameConxtext);
  const navigatorTheme = useTheme();

  const theme = navigatorTheme.dark ? Colours.dark : Colours.light;

  return (
    <Screen>
      <View style={{ alignItems: "center" }}>
        <TokenScreenHeader
          icon={icon}
          name={name}
          isDark={navigatorTheme.dark}
        />
        <TimeSelector />
        <View style={styles.tokenCardContainer}>
          <TokenCard
            id={id}
            symbol={symbol}
            disabled={true}
            timeFrame={timeFrame.timeFrame}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.textPrimary, { color: theme.primary }]}>
            Information
          </Text>
          <View style={{ paddingLeft: 34 }}>
            <View style={styles.infoContainer}>
              <View>
                <Text
                  style={[
                    styles.textSecondary,
                    { color: theme.secondary },
                    { marginRight: 15 },
                    { width: 87 },
                  ]}
                >
                  Symbol:
                </Text>
                <Text
                  style={[
                    styles.textSecondary,
                    { color: theme.secondary },
                    { marginRight: 15 },
                    { width: 87 },
                  ]}
                >
                  Market cap:
                </Text>
                <Text
                  style={[
                    styles.textSecondary,
                    { color: theme.secondary },
                    { marginRight: 15 },
                    { width: 87 },
                  ]}
                >
                  24h Volume:
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.textSecondary, { color: theme.secondary }]}
                >
                  {symbol}
                </Text>
                <NumberFormat
                  renderText={(text) => (
                    <Text
                      style={[styles.textSecondary, { color: theme.secondary }]}
                    >
                      {text} NZD
                    </Text>
                  )}
                  value={market_cap.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <NumberFormat
                  renderText={(text) => (
                    <Text
                      style={[styles.textSecondary, { color: theme.secondary }]}
                    >
                      {text} NZD
                    </Text>
                  )}
                  value={volume_24h.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tokenCardContainer: {
    marginTop: 9,
  },
  textContainer: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  textPrimary: {
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 12,
  },
  textSecondary: {
    marginBottom: 12,
    fontSize: 15,
  },
  infoContainer: {
    flexDirection: "row",
  },
});
