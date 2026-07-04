import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../../todoApi';
import { setEditingTodoId, clearEditingTodoId } from '../../features/todos/todosSlice';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TodoItem } from "@/components/TodoItem";


function TodoList() {
  const dispatch = useDispatch();
  const editingTodoId = useSelector(state => state.todos.editingTodoId);
  
  const [newTodo, setNewTodo] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Queries run automatically on component mount
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();

  console.log('log ===> todos', todos);
  
  // Mutations return a trigger function and an object with status flags
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    // Add the new todo item to the list
    await addTodo({text: newTodo});
    setNewTodo("");
  }

  const onAddTodoChange = (e) => {
    setNewTodo(e.target.value);
  }

  const toggleTodoItemComplete = async (id, checked) => {
    try {
      await updateTodo({ id, is_completed: checked });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }

  const openTodoItemEditMode = (id) => {
    dispatch(setEditingTodoId(id));
  }

  const closeTodoItemEditMode = (id) => {
    dispatch(clearEditingTodoId());
  }

  const updateTodoItemText = async (id, newText) => {
    if (newText.trim() === "") return;
    
    try {
      await updateTodo({ id, text: newText });
      dispatch(clearEditingTodoId());
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }

  const deleteTodoItem = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex flex-col w-full gap-4">
      <form className="flex gap-1 w-full" onSubmit={handleAddTodo}>
        <Input type="text" id="add-task" placeholder="Add todo item" value={newTodo} onChange={onAddTodoChange} />
        <Button type="submit" variant="secondary">Add</Button>
      </form>
      <div className="flex flex-col gap-1">
        {todos && todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            id={todo.id} 
            text={todo.text}
            isCompleted={todo.is_completed}
            toggleTodoItemComplete={toggleTodoItemComplete}
            mode={editingTodoId === todo.id ? 'edit' : 'view'}
            openTodoItemEditMode={openTodoItemEditMode}
            updateTodoItemText={updateTodoItemText}
            closeTodoItemEditMode={closeTodoItemEditMode}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
    </div>
  );
}

export { TodoList };