import { configureStore } from "@reduxjs/toolkit";
import updateCartsReducer from "./src/slice/cartSlice";
import setCategoryReducer from "./src/slice/productsSlice";
import messageReducer from "./src/slice/messageSlice";

//設定檔
export const store = configureStore({
  reducer: {
    cart: updateCartsReducer,
    message: messageReducer,
    products: setCategoryReducer,
  },
});

export default store;
