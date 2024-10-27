import React, { useState } from 'react';
import '../App.css';

const TodoCard = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(todo.name);
    const [description, setDescription] = useState(todo.description);
    const [status, setStatus] = useState(todo.status);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTodo({
            ...todo,
            name,
            description,
            status
        });
        setIsEditing(false);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        updateTodo({
            ...todo,
            status: e.target.value
        });
    };

    return (
        <div className="todo-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div>
                        <label>Status: </label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="not_completed">Not Completed</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <h3>Task :{todo.name}</h3>
                    <p>Description :{todo.description}</p>
                    <div>
                        <label>Status: </label>
                        <span>{todo.status === 'completed' ? 'Completed' : 'Not Completed'}</span>
                    </div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TodoCard;
