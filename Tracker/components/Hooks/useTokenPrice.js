import { useEffect, useState } from "react";
import tokensApi from "../api/tokensApi";

/**
 * This custom hook returns the token price history for a specific token and timeframe,
 * also returning a loading variable to be able to show a loading spinner while its fetching the info.
 * @param {Id of the token} id
 * @param {Time frame for the price history} timeFrame
 */
export default function useTokenPrice(id, timeFrame) {
  const [tokenPrice, setTokenPrice] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    tokensApi.getTokenPrice(id, timeFrame).then((response) => {
      if (isSubscribed) {
        setTokenPrice(response.data);
        setLoading(false);
      }
    });
    return () => (isSubscribed = false);
  }, [timeFrame]);

  return [tokenPrice, loading];
}
