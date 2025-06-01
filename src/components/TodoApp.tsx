import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = { id: Date.now(), text: input };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            className="flex-1 px-4 py-2 text-[#151515] rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a task..."
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          <AnimatePresence>
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 px-4 py-3 rounded-xl flex justify-between items-center shadow"
              >
                <span className="text-gray-700">{todo.text}</span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  &#10005;
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
