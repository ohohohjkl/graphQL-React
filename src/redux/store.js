import { configureStore } from "@reduxjs/toolkit";

import todo from "./slices/todo";

const store = configureStore({
  reducer: {
    todo,
  },
});

export default store;
