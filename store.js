import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/slice/cartSlice";
import messageReducer from "./src/slice/messageSlice";

//設定檔
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    message: messageReducer,
  },
});

export default store;
