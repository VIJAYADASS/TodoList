"use client";
import React, { useState, useEffect} from 'react';
import "./styles.css";
import { AiFillDelete,  } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { BsCheckAll,   } from 'react-icons/bs';
import { LiaSaveSolid } from 'react-icons/lia';



const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTasks, setnewTasks] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editTodo, setEditTodo] = useState('');
    const [filter, setFilter] = useState('All');
    const [completedCount, setCompletedCount] = useState(0);
  
    const handleInputChange = (e) => {
      setnewTasks(e.target.value);
    };
  
    const handleAddTodo = () => {
      if (newTasks.trim() !== '') {
        const newTodo = {
          text : newTasks,
          completed : false
        };
        
       setTodos([...todos, newTodo]);
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
      setEditTodo(todos[index].text);
    };
  
    const handleUpdateTodo = () => {
      if (editTodo.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].text = editTodo;
        setTodos(updatedTodos);
        setEditIndex(-1);
        setEditTodo('');
      }
    };
    const handleDeleteAll = () => {
      setTodos([]);
    };
     
    const handleCompleteAll = () => {
      const updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: true
      }));
      setTodos(updatedTodos);
    };

    const handleFilterChange = (value) => {
      setFilter(value);
    };
  
    useEffect(() => {
      const completedTasks = todos.filter((todo) => todo.completed);
      setCompletedCount(completedTasks.length);
    }, [todos]);
  
    const filteredTodos = todos.filter((todo) => {
      if (filter === 'All') {
        return true;
      } else if (filter === 'Completed') {
        return todo.completed;
      } else if (filter === 'Uncompleted') {
        return !todo.completed;
      }
      return false;
    });
  

  return (
        <div className='container-center'>
            <h2>
                Todo List  
            </h2> 
            <div className="row">
                <input
                  type="text"
                  value={newTasks}
                  onChange={handleInputChange}
                  placeholder="Add your todo "/> 
                  <button id="btn" onClick={handleAddTodo} >Add Todo</button>
            </div>

            <div className="mid">
              <h3 style={{  fontWeight : "900px", }}>< BsCheckAll size={30}/></h3>

                  <p  id="complete-all"  onClick={handleCompleteAll}> Complete All Tasks</p>
                  <p id="clear-all" onClick={handleDeleteAll}>Delete Comp Tasks</ p>
               
             
            </div>
            <ul>
                {todos.map((todo, index) => (
                  <li key={index}>
                    <input type="checkbox" className="custom-checkbox" 
                      checked={todo.completed}
                      onChange={() => {
                      const updatedTodos = [...todos];
                      updatedTodos[index] =  {
                      ...updatedTodos[index],
                      completed: !updatedTodos[index].completed
                      };
                      setTodos(updatedTodos);
                      }}
                    />
                        {editIndex === index ? (
                        <input
                            type="text"
                            value={editTodo} className='custom-checkbox'
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                        ) : (

                        todo.text
                        )}
                        <button onClick={() => handleDeleteTodo(index)}>
                          <h3 className='delete-icon'> 
                            < AiFillDelete /> 
                          </h3>
                        </button>
                        
                        {editIndex === index ? (
                        <button onClick={handleUpdateTodo}> 
                          <h3 className='save-icon'>
                            <LiaSaveSolid />
                          </h3>
                        </button>
                        
                        ) : (

                        <button onClick={() => handleEditTodo(index)}>
                           <h3 className='edit-icon'> 
                              < MdEdit /> 
                            </h3>
                        </button>
                         
                        )}
                    </li>
                ))}
            </ul> 
                        <div className='Filters' />
                          <div className='dropdown' />
                            <button className='dropbtn'>
                              Filter
                            </button>
                            <div className='dropdown-content' >
                              <a href='#'  onClick={() => handleFilterChange('All')}>
                                  All</a>
                              <a href='#' onClick={() => handleFilterChange('Uncompleted')}>
                                  Uncompleted</a>
                              <a href='#'  onClick={() => handleFilterChange('Completed')}>
                                  Completed </a>
                            </div>
                            <div className='completed-task'>
                              <p>Completed : 
                                  <span id='complete-count'>{completedCount}</span>
                              </p>
                            </div>
                            <div className='remaning-task'>
                                <p>
                                    <span id='tasks-counter'>{todos.length - completedCount}</span>
                                </p>
                            </div>
                          

           
 
        </div>
  );
}

export default  TodoList;

