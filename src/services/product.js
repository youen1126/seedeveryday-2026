import { adminApi, api, API_PATH } from "./api";

//前台
export const getProductApi = (page = 1, category) => {
  return api.get(`/api/${API_PATH}/products`, {
    params: {
      page,
      category: category === "全部商品" ? undefined : category,
    },
  });
};

export const getProductAllApi = () => {
  return api.get(`/api/${API_PATH}/products/all`);
};

//取單一商品
export const getThisProductApi = (id) => {
  return api.get(`/api/${API_PATH}/product/${id}`);
};

//後台Admin
export const getAdminProductApi = (page = 1, category) => {
  return adminApi.get(`/api/${API_PATH}/admin/products`, {
    params: {
      page,
      category: category === "全部商品" ? undefined : category,
    },
  });
};
