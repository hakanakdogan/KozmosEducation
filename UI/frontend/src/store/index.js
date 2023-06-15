import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slices/userInfo";
import contractInfoSlice from "./slices/contractInfo";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    contractInfo: contractInfoSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
