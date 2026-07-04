import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://todo-express-sqlite-1ggcz12qj-surenderlohias-projects.vercel.app/'; // Local back-end URL: http://localhost:3000/
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Todo'], // Used for automatic cache invalidation (auto-refetching)
  endpoints: (builder) => ({
    // 1. READ (Get all todos)
    getTodos: builder.query({
      query: (filters) => ({
        url: 'todos',
        params: filters === 'all' ? {} : {is_completed: filters === 'completed'}, 
      }),
      providesTags: ['Todo'], 
    }),
    
    // 2. CREATE (Add a new todo)
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'], // Forces 'getTodos' to refetch automatically
    }),

    // 3. UPDATE (Edit an existing todo)
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Todo'],
    }),

    // 4. DELETE (Remove a todo)
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

// RTK Query automatically generates hooks based on your endpoint names
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;