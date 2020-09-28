import React from "react";

const TimeFrameConxtext = React.createContext({
  timeFrame: "month",
  changeTimeFrameContext: () => {},
});

export const TimeFrameProvider = TimeFrameConxtext.Provider;

export default TimeFrameConxtext;
