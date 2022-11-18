import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  currentTodo: {},
  total: 0,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    onGetTodo: (state, action) => {
      const { payload } = action;
      state.todos = payload;
      state.total = state.todos.length;
    },

    onUpdateTodo: (state, action) => {
      const { payload } = action;

      state.todos = state.todos.map((item) => {
        if (item.id === payload.id) return { ...payload };
        else return { ...item };
      });
    },

    onCreateTodo: (state, action) => {
      const { payload } = action;
      state.todos = [{ ...payload }, ...state.todos];
      state.total = state.total + 1;
    },

    onDeleteTodo: (state, action) => {
      const { payload: id } = action;
      state.todos = state.todos.filter((item) => item.id !== id);
      state.total = state.total - 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onGetTodo, onUpdateTodo, onCreateTodo, onDeleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
