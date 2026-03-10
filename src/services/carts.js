import { api, API_PATH } from "./api";

export const getCartsApi = () => {
  return api.get(`/api/${API_PATH}/cart`);
};

export const AddCartApi = (id, qty = 1) => {
  return api.post(`/api/${API_PATH}/cart`, {
    product_id: id,
    qty,
  });
};

export const DelCartApi = (cartId) => {
  return api.delete(`/api/${API_PATH}/cart/${cartId}`);
};
