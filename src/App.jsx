import './App.css';
import { TodoList } from "@/components/TodoList";

function App() {
  return (
    <div className="full-vh flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-md flex-col items-center py-8 px-8 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left mb-3">Todo List</h1>
        <TodoList />
      </main>
    </div>
  )
}

export default App
