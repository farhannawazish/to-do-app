

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineDone, MdModeEditOutline } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';

export default function App() {
  // State management
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks on page load
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/todos');
      if (Array.isArray(res.data)) {
        setTodos(res.data);
      } else {
        setTodos([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not connect to backend server. Make sure the server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 1. Add a new task
  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      const res = await axios.post('/api/todos', { text: newTodo.trim() });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.response?.data?.message || 'Error adding task. Check server connection.');
    }
  };

  // 2. Toggle completion status
  const toggleTodo = async (id) => {
    const targetTodo = todos.find((todo) => todo._id === id);
    if (!targetTodo) return;

    try {
      const res = await axios.patch(`/api/todos/${id}`, { 
        completed: !targetTodo.completed,
      });

      setTodos((prev) => prev.map((todo) => (todo._id === id ? res.data : todo)));
      setError(null);
    } catch (err) {
      console.error('Error toggling task:', err);
      setError(err.response?.data?.message || 'Error toggling task.');
    }
  };

  // 3. Delete a task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.response?.data?.message || 'Error deleting task.');
    }
  };

  // 4. Trigger edit mode setup
  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  // 5. Save edited task changes
  const saveEdit = async (id) => {
    if (editedText.trim() === '') return;

    try {
      const res = await axios.patch(`/api/todos/${id}`, { text: editedText.trim() });
      setTodos((prev) => prev.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingTodo(null);
      setEditedText('');
      setError(null);
    } catch (err) {
      console.error('Error saving task edit:', err);
      setError(err.response?.data?.message || 'Error saving task edit.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-700 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>

        <div className="mt-4">
          {loading ? (
            <div className="text-center text-gray-400 py-6">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="text-center text-gray-400 py-6">No tasks found. Add some above!</div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(todo._id);
                          if (e.key === 'Escape') setEditingTodo(null);
                        }}
                        autoFocus
                      />
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 overflow-hidden">
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center cursor-pointer ${
                              todo.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>
                          <span className={`text-gray-800 truncate font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200 cursor-pointer"
                            onClick={() => startEditing(todo)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200 cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

