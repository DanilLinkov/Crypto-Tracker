import client from "./client";

const assetsEndPoint = "/all";
const assetPriceEndPoint = "/asset/id";

const getTokens = () => client.get(assetsEndPoint);

const getTokenPrice = (id, rate) =>
  client.get(
    assetPriceEndPoint + `/${id}/rate?fiat=NZD&period=week&type=historic`
  );

export default {
  getTokens,
  getTokenPrice,
};
