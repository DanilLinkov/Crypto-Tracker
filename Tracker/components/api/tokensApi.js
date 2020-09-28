import client from "./client";

const assetsEndPoint = "/all";
const assetPriceEndPoint = "/asset/id";

// Sends a get request to fetch all the tokens
const getTokens = () => client.get(assetsEndPoint);

// Sends a get request to fetch the price history for a specific token and a specific rate
const getTokenPrice = (id, rate) =>
  client.get(
    assetPriceEndPoint + `/${id}/rate?fiat=NZD&period=${rate}&type=historic`
  );

export default {
  getTokens,
  getTokenPrice,
};
