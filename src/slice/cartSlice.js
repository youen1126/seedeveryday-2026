import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import { createAsyncMessage } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    finally_total: 0,
  },
  //動作 action
  reducers: {
    updateCarts: (state, action) => {
      const { carts, total, finally_total } = action.payload;
      state.carts = carts || [];
      state.total = total || 0;
      state.finally_total = finally_total || 0;
      console.log("觸發updateCarts");
    },
  },
});
//取得購物車data api
export const createAsyncGetCart = createAsyncThunk(
  "cart/createAsyncGetCart",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      console.log("觸發createAsyncGetCart:", res.data.data);
      dispatch(updateCarts(res.data.data));
    } catch (error) {
      console.error(error.respones);
    }
  },
);
//item加入購物車 api
export const createAsyncAddCart = createAsyncThunk(
  "cart/createAsyncAddCart",
  async ({ id, qty = 1 }, { dispatch }) => {
    const data = {
      product_id: id,
      qty,
    };
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      alert(res.data.message);
      console.log("觸發createAsyncAddCart:", res.data);
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.error(error.respones);
    }
  },
);
//刪除單一產品api
export const createAsyncDelCart = createAsyncThunk(
  "cart/createAsyncDelCart",
  async (cartId, { dispatch }) => {
    try {
      const res = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
      );
      alert(res.data.message);
      console.log("觸發createAsyncDelCart:", res.data);
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.error(error.respones);
    }
  },
);

export const { updateCarts } = cartSlice.actions;

export default cartSlice.reducer;
