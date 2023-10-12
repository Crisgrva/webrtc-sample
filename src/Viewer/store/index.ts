import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from "./slices/common";

const store = configureStore({
  reducer: {
    common: CommonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
