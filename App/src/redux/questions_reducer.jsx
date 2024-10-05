import { createSlice } from "@reduxjs/toolkit";

/** Create the questions slice */
const questionSlice = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      const { question, answers } = action.payload;
      // Directly mutate the state
      state.queue = question;
      state.answers = answers;
    },
    moveNextAction: (state) => {
      // Directly mutate the state
      state.trace += 1;
    },
    movePrevAction: (state) => {
      // Directly mutate the state
      state.trace -= 1;
    },
    resetAllAction: (state) => {
      // Reset state directly
      state.queue = [];
      state.answers = [];
      state.trace = 0;
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
} = questionSlice.actions;

export default questionSlice.reducer;
