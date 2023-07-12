"use client";
import React, { useState } from 'react';
import "./styles.css";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTasks, setnewTasks] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editTodo, setEditTodo] = useState('');
  
    const handleInputChange = (e) => {
      setnewTasks(e.target.value);
    };
  
    const handleAddTodo = () => {
      if (newTasks.trim() !== '') {
        setTodos([...todos, newTasks]);
        setnewTasks('');
      }
    };
  
    const handleDeleteTodo = (index) => {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    };
  
    const handleEditTodo = (index) => {
      setEditIndex(index);
      setEditTodo(todos[index]);
    };
  
    const handleUpdateTodo = () => {
      if (editTodo.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = editTodo;
        setTodos(updatedTodos);
        setEditIndex(-1);
        setEditTodo('');
      }
    };
  
  return (
        <div>
        <h2>Todo List</h2>
        <div className="row">
        
        <input
            type="text"
            value={newTasks}
            onChange={handleInputChange}
            placeholder="Add your todo "/> 
        <button id="btn" onClick={handleAddTodo}>Add Todo</button>
        </div>

        <div className="mid">
            
            <p id="complete-all">complete all tasks</p>
            <p id="clear-all">Delete complete tasks</p>
        </div>

            <ul>
                {todos.map((todo, index) => (
                <li key={index}>
                        {editIndex === index ? (
                        <input
                            type="text"
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                        ) : (
                        todo
                        )}
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                        {editIndex === index ? (
                        <button onClick={handleUpdateTodo}>Save</button>
                        ) : (
                        <button onClick={() => handleEditTodo(index)}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default  TodoList;

