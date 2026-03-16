import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import { createAsyncMessage } from "@reduxjs/toolkit";
import { DelCartApi, getCartsApi, UpdataItemNumApi } from "../services/carts";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    finally_total: 0,
    loadingItem: null,
  },
  //動作 action
  reducers: {
    updateCarts: (state, action) => {
      const { carts, total, finally_total } = action.payload;
      state.carts = carts || [];
      state.total = total || 0;
      state.finally_total = finally_total || 0;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createAsyncUpdataItemNum.pending, (state, action) => {
        state.loadingItem = action.meta.arg.cartId;
      })

      .addCase(createAsyncUpdataItemNum.fulfilled, (state) => {
        state.loadingItem = null;
      })

      .addCase(createAsyncUpdataItemNum.rejected, (state) => {
        state.loadingItem = null;
      });
  },
});
//取得購物車data api
export const createAsyncGetCart = createAsyncThunk(
  "cart/createAsyncGetCart",
  async (_, { dispatch }) => {
    try {
      const res = await getCartsApi();
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
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      dispatch(createAsyncGetCart());
      return { success: true };
    } catch (error) {
      console.error(error.response || "加入購物車失敗");
    }
  },
);
//刪除單一產品api
export const createAsyncDelCart = createAsyncThunk(
  "cart/createAsyncDelCart",
  async (cartId, { dispatch }) => {
    try {
      await DelCartApi(cartId);
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.error(error.response);
    }
  },
);

//更改商品數量
export const createAsyncUpdataItemNum = createAsyncThunk(
  "cart/createAsyncUpdataItemNum",
  async ({ cartId, productId, qty }, { dispatch }) => {
    const data = {
      product_id: productId,
      qty,
    };

    await UpdataItemNumApi(cartId, data);

    dispatch(createAsyncGetCart());

    return { cartId };
  },
);

export const { updateCarts } = cartSlice.actions;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartFinallyTotal = (state) => state.cart.finally_total;

export default cartSlice.reducer;
