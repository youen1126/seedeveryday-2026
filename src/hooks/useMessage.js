// useMessage
// 封裝訊息通知行為（呼叫 createAsyncMessage）

import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { createAsyncMessage } from "@/slice/messageSlice";

export default function useMessage() {
  const dispatch = useDispatch();

  const showSuccess = useCallback(
    (message) => {
      dispatch(
        createAsyncMessage({
          success: true,
          message,
        }),
      );
    },
    [dispatch],
  );

  const showError = useCallback(
    (message) => {
      dispatch(
        createAsyncMessage({
          success: false,
          message,
        }),
      );
    },
    [dispatch],
  );

  return {
    showSuccess,
    showError,
  };
}
