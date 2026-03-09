import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [
    //初始值
    // {
    //     id: 1,
    //     type: 'success',
    //     title: '成功',
    //     text: '測試用的'
    // }
  ],
  reducers: {
    createMessage(state, action) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? "success" : "danger",
        title: action.payload.success ? "成功" : "失敗",
        text: action.payload.message,
        img: action.payload.success
          ? "https://media1.tenor.com/m/SsPt6Ko9mnAAAAAd/cat-cute-cat.gif"
          : "https://media1.tenor.com/m/cxTH4XWKUVIAAAAC/cat.gif",
      });
    },
    removeMessage(state, action) {
      const index = state.findIndex((message) => message.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage", //取一個唯一名字
  async (payload, { dispatch, requestId }) => {
    dispatch(
      createMessage({
        ...payload,
        id: requestId,
      }),
    );

    setTimeout(() => {
      dispatch(removeMessage(requestId));
    }, 2000);
  },
);

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
