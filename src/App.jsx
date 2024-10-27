import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = (todo) => {
    axios.post(`${import.meta.env.VITE_API_URL}/create`, todo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
  };

  const updateTodo = (updatedTodo) => {
    axios.put(`${import.meta.env.VITE_API_URL}/${updatedTodo._id}/update`, updatedTodo)
      .then(response => {
        setTodos(todos.map(todo => (todo._id === updatedTodo._id ? response.data : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/${id}/delete`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'incompleted') return todo.status === 'not_completed';
    return true;
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <h2>Set your goals Today!!</h2>
      <TodoForm addTodo={addTodo} />
      <div>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
        </select>
      </div>
      <TodoList
        todos={filteredTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
