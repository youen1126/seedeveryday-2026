import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductAllApi, getProductApi } from "../services/product";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pagination: {},
    categories: [],
    categoryCounts: {},
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
        state.categories = action.payload.categories;
        state.categoryCounts = action.payload.categoryCounts;
      })
      .addCase(createAsyncGetAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //分類商品
      .addCase(createAsyncGetProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      });
  },
});

//取得全部產品（順便整理 categories）
export const createAsyncGetAllProducts = createAsyncThunk(
  "products/createAsyncGetAllProducts",
  async () => {
    const res = await getProductAllApi();
    const products = res.data.products || [];
    const categoryCounts = products.reduce((acc, item) => {
      const category = item.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categories = [
      "全部商品",
      ...new Set(products.map((item) => item.category)),
    ];

    return {
      categories,
      categoryCounts: {
        ...categoryCounts,
        全部商品: products.length,
      },
    };
  },
);

//取得某分類產品
export const createAsyncGetProducts = createAsyncThunk(
  "products/createAsyncGetProducts",
  async ({ page = 1, category }) => {
    const res = await getProductApi(page, category);

    return {
      products: res.data.products,
      pagination: res.data.pagination,
    };
  },
);

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;
