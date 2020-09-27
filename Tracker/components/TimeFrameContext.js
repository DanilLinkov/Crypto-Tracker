import React from "react";

const TimeFrameConxtext = React.createContext({
  timeFrame: "month",
  changeContext: () => {},
});

export const TimeFrameProvider = TimeFrameConxtext.Provider;

export default TimeFrameConxtext;
