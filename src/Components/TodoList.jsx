import React from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoCard
                    key={todo.id}
                    todo={todo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
