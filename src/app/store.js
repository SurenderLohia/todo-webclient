import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from '../todoApi';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    // Add the generated reducer as a specific top-level slice
    [todoApi.reducerPath]: todoApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of rtk-query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});