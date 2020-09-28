import { useRoute, useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import TimeFrameConxtext from "../components/TimeFrameContext";
import TimeSelector from "../components/TimeSelector";
import TokenCard from "../components/TokenCard";
import TokenScreenHeader from "../components/TokenScreenHeader";
import NumberFormat from "react-number-format";
import Colours from "../components/Colours";

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
          <View style={styles.infoContainer}>
            <View>
              <Text style={[styles.textSecondary, { color: theme.secondary }]}>
                Symbol:
              </Text>
              <Text style={[styles.textSecondary, { color: theme.secondary }]}>
                Market cap:
              </Text>
              <Text style={[styles.textSecondary, { color: theme.secondary }]}>
                24h Volume:
              </Text>
            </View>
            <View>
              <Text style={[styles.textSecondary, { color: theme.secondary }]}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  tokenCardContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: 30,
  },
  textPrimary: {
    //color: Colours.light.primary,
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 5,
  },
  textSecondary: {
    //: Colours.light.secondary,
    margin: 7,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
