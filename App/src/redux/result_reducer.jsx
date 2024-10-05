import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  result: [],
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      // Ensure trace is within bounds of the result array
      if (trace >= 0 && trace < state.result.length) {
        state.result[trace] = checked;
      }
    },
    resetResultAction: () => initialState,
  },
});

export const {
  setUserId,
  pushResultAction,
  updateResultAction,
  resetResultAction,
} = resultSlice.actions;

export default resultSlice.reducer;
