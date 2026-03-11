import { api, API_PATH } from "./api";

export const postOrderApi = () => {
  return api.get(`/api/${API_PATH}/order`, {
    data,
  });
};
