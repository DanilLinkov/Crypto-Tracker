import React from "react";
import { StyleSheet } from "react-native";
import { AreaChart, LineChart } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import * as shape from "d3-shape";
import Colours from "./Colours";

export default function GradientGraph({ data, gradientDisabled }) {
  const Gradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id={"gradient"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgb(241, 90, 41)"} stopOpacity={0.2} />
        <Stop offset={"100%"} stopColor={"rgb(0, 0, 0)"} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );

  const Line = ({ line }) => (
    <Path
      key={"line"}
      d={line}
      stroke={Colours.light.graph}
      fill={"none"}
      strokeWidth={2}
      strokeOpacity={0.6}
    />
  );

  return (
    <React.Fragment>
      {gradientDisabled ? (
        <LineChart
          style={{
            height: 150,
          }}
          data={data}
          curve={shape.curveBasis}
          svg={{
            strokeWidth: 2,
            stroke: Colours.light.graph,
            strokeOpacity: 0.6,
          }}
          contentInset={{ top: 5, bottom: 100 }}
        ></LineChart>
      ) : (
        <AreaChart
          style={{ height: 150 }}
          data={data}
          curve={shape.curveBasis}
          contentInset={{ bottom: 100 }}
          svg={{
            fill: "url(#gradient)",
          }}
        >
          <Gradient />
          <Line />
        </AreaChart>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
