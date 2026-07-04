import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingTodoId: null, // Track which todo is being edited
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setEditingTodoId: (state, action) => {
      state.editingTodoId = action.payload;
    },
    clearEditingTodoId: (state) => {
      state.editingTodoId = null;
    },
  },
});

export const { setEditingTodoId, clearEditingTodoId } = todosSlice.actions;
export default todosSlice.reducer;
