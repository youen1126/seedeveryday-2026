import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductAllApi, getProductApi } from "../services/product";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    currentCategory: "全部商品",
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //全部商品
      .addCase(createAsyncGetAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAsyncGetAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(createAsyncGetAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //分類商品
      .addCase(createAsyncGetProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

//取得全部產品（順便整理 categories）
export const createAsyncGetAllProducts = createAsyncThunk(
  "products/createAsyncGetAllProducts",
  async () => {
    const res = await getProductAllApi();

    const categories = [
      "全部商品",
      ...new Set(res.data.products.map((item) => item.category)),
    ];

    return {
      products: res.data.products,
      categories,
    };
  },
);

//取得某分類產品
export const createAsyncGetProducts = createAsyncThunk(
  "products/createAsyncGetProducts",
  async ({ page = 1, category }) => {
    const res = await getProductApi(page, category);

    return res.data.products;
  },
);

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;
