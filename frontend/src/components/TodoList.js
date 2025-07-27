import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editingText, setEditingText] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        try {
            await axios.post('http://localhost:5000/api/tasks', { text: newTaskText });
            setNewTaskText('');
            fetchTasks(); // Re-fetch tasks to update list
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };
    
    const handleEditTask = async (e, task) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task.id}`, { ...task, text: editingText });
            setEditingTask(null);
            setEditingText('');
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    // ✨ NEW: Function to toggle the task's completion status
    const handleToggleComplete = async (task) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
                ...task,
                completed: !task.completed
            });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    const startEditing = (task) => {
        setEditingTask(task.id);
        setEditingText(task.text);
    };

    return (
        <div className="todo-container">
            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button type="submit">Add Task</button>
            </form>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        {editingTask === task.id ? (
                            <form onSubmit={(e) => handleEditTask(e, task)} className="edit-form">
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    autoFocus
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <>
                                {/* ✨ NEW: Checkbox for marking task as done */}
                                <input
                                    type="checkbox"
                                    className="task-checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task)}
                                />
                                <span className="task-text">{task.text}</span>
                                <div className="task-buttons">
                                    <button onClick={() => startEditing(task)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Remove</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;