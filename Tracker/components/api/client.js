import { create } from "apisauce";

/**
 * This file creates the apiClient that is then used to send get requests
 */
const apiClient = create({
  // base url of the api
  baseURL: "https://assets-api.sylo.io/v2",
});

export default apiClient;
