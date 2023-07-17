"use client";
import React, { useState, useEffect} from 'react';
import "./styles.css";
import { AiFillDelete  } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { BsCheckAll   } from 'react-icons/bs';
import { LiaSaveSolid } from 'react-icons/lia';
 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTasks, setnewTasks] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editTodo, setEditTodo] = useState('');
    const [filter, setFilter] = useState('All');
    const [completedCount, setCompletedCount] = useState(0);
    const [showFilterOptions, setShowFilterOptions] = useState(false);
  
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
      const incompleteTasks = todos.filter((todo) => !todo.completed);
      setTodos(incompleteTasks);
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
      return true;
    });
  
    const handleFilterButtonClick = () => {
      setShowFilterOptions((prevShowFilterOptions) => !prevShowFilterOptions);
    };

  return (
        <div className='container'>
            <div className='todoapp'></div>
            <h2>    
                Todo List  
            </h2> 

            <div className="row">
                <input
                  type="text"
                  value={newTasks}
                  className='add-task'
                  onChange={handleInputChange}
                  placeholder="Add your todo "/> 
                  <button id="btn" onClick={handleAddTodo} alt= " " className='bg-stone-300'>Add Todo</button>
            </div>

            <div className="mid"> 
               
              <h3 style={{  fontWeight : "900px", }}>< BsCheckAll size={30}/></h3>

                  <p  id="complete-all"  onClick={handleCompleteAll}  > Complete All Tasks</p>
                  <p id="clear-all" onClick={handleDeleteAll}>Delete Comp Tasks</ p>
               
             
            </div>
            <ul >  
                {filteredTodos.map((todo, index) => (
                  <li key={index}>
                    <input type="checkbox" alt=''
                      className="custom-checkbox" 
                      checked={todo.completed}
                      onChange={() => {
                      const updatedTodos = [...todos];
                      updatedTodos[index] =  {
                      ...updatedTodos[index],
                      completed: !updatedTodos[index].completed
                      };
                      setTodos(updatedTodos); 
                      }} />
                   
                        {editIndex === index ? (
                        <input
                            type="text" alt='' 
                            value={editTodo} className='custom-checkbox' 
                            onChange={(e) => setEditTodo(e.target.value)} />
                         
                        ) : (

                        todo.text
                        )}
                        {editIndex !== index && (
                          
                          <button onClick={() => handleEditTodo(index)} alt=''>
                            <h3 className='edit-icon   ' >
                              <MdEdit />
                            </h3>
                          </button>
                        )}

                        {editIndex === index && (
                           
                          <button onClick={handleUpdateTodo} alt=''>
                            <h3 className='save-icon after:'>
                              <LiaSaveSolid />
                            </h3>
                          </button>
                        )}

                        {editIndex !== index && (
                           
                          <button onClick={() => handleDeleteTodo(index)} alt=''>
                            <h3 className='delete-icon '>
                              <AiFillDelete />
                            </h3>
                          </button>
                        )}
                    </li>
                  ))}
              </ul> 
                    <div className='Filters'></div>
                        <div className='dropdown'>
                            <button
                                className={`dropbtn ${showFilterOptions ? 'active' : ''}`}
                                onClick={handleFilterButtonClick}
                                onMouseEnter={() => setShowFilterOptions(true)}
                                // onMouseLeave={() => setShowFilterOptions(false)}
                                > Filter
                              </button>
                              </div>
                                
                              <div className={`dropdown-content ${showFilterOptions ? 'show' : ''}`} 
                              style={{ display: showFilterOptions ? 'block' : 'none', maxHeight: '200px', overflowY: 'auto' }}>
                                  
                                  <div className="dropdown-scroll" />
                                  <a  
                                      href="#"
                                      onClick={() => {
                                        handleFilterChange('All');
                                        setShowFilterOptions(false);  
                                      }}
                                      className={filter === 'All' ? 'active' : '' }
                                         >
                                      All
                                    </a>
                                  <a
                                      href='#'
                                      onClick={() => {
                                      handleFilterChange('Uncompleted')
                                      setShowFilterOptions(false);
                                      }}
                                      className={filter === 'Uncompleted' ? 'active' : ''}>
                                   
                                      Uncompleted
                                    </a>
                                  <a
                                      href='#'
                                      onClick={() => {
                                      handleFilterChange('Completed')
                                      setShowFilterOptions(false); 
                                      }}
                                      className={filter === 'Completed' ? 'active' : ''}
                                    >
                                      Completed
                                  </a>
                                </div>

                                  
                              <div className='completed-task'>
                                  <p>Completed : 
                                      <span id='complete-count'>{completedCount}</span>
                                  </p>
                              </div>
                              <div className='remaining-task'>
                                  <p> Total-Tasks :
                                      <span id='remaining-task'>{todos.length}</span>
                                  </p>
                              </div>
            </div>
  );
}

export default  TodoList;