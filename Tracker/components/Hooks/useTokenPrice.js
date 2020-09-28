import { useEffect, useState } from "react";
import tokensApi from "../api/tokensApi";

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
