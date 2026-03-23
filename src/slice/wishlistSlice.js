import { createSlice } from "@reduxjs/toolkit";

//  初始化（從 localStorage 拿）
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishList");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const initialState = {
  items: loadFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const id = action.payload;

      state.items[id] = !state.items[id];

      //  同步 localStorage
      localStorage.setItem("wishList", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = {};
      localStorage.removeItem("wishList");
    },
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
