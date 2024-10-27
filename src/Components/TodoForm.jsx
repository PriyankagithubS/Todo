import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description) {
            addTodo({
                id: Date.now(),
                name,
                description,
                status: 'not_completed'
            });
            setName('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task Name"
                className="form-control mb-2 mr-sm-2"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="form-control mb-2 mr-sm-2"
                required
            />

            <button type="submit" className="btn btn-primary mb-2">
                Add Task
            </button>
        </form>

    );
};

export default TodoForm;
