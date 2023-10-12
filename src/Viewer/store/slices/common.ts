import { createSlice } from "@reduxjs/toolkit";

interface initialStateT {
  status: RTCPeerConnectionState;
}

const initialState: initialStateT = {
  status: "disconnected",
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    showRTCStatus(state, action: { payload: initialStateT["status"] }) {
      state.status = action.payload;
    },
  },
});

export const { showRTCStatus } = CommonSlice.actions;

export default CommonSlice.reducer;
