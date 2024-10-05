import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** Import reducers */
import questionReducer from "./questions_reducer.jsx";
import resultReducer from "./result_reducer.jsx";

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
});

// Create and export the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
