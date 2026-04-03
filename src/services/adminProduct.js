import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export function deleteAdminProductApi(id) {
  return axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
}

export function uploadAdminProductImageApi(formData) {
  return axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData);
}

export function createAdminProductApi(productData) {
  return axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, productData);
}

export function updateAdminProductApi(id, productData) {
  return axios.put(
    `${API_BASE}/api/${API_PATH}/admin/product/${id}`,
    productData,
  );
}
