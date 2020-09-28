import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://assets-api.sylo.io/v2",
});

export default apiClient;
