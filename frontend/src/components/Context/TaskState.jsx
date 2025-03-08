import React from 'react';
import TaskContext from './TaskContext';
import { useState } from 'react';


const TaskState = (props) => {
const host = "http://localhost:5000"
  // const s1 = {
  //   "name": 'Suraj',
  //   "class": '7a'
  // };
  
  //  const [state, setState] = useState(s1)
  //  const update = () =>{
  //   setTimeout (() => {
  //     setState({
  //       "name": 'Suraj Gupta',
  //       "class": '10a'
  //     })
  //   }, 1000);
  //  }
const tasksInitials = []

const [tasks, setTasks ] = useState(tasksInitials)

//Get all tasks
const getTasks= async () =>{
  const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
});
const json = await response.json();
console.log(json);
setTasks(json);
}
//Add a new task
const addTask = async (title, description, tag) =>{
  //TODO: API CALL
  const response = await fetch(`${host}/api/tasks/addtask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
  
    body: JSON.stringify({title, description, tag})
  });
  const task = await response.json();
  setTasks(tasks.concat(task))
}

//Delete a task
const deleteTask = async (id) =>{
  const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    }
  });
  const json =   response.json();
  console.log(json);

  console.log("Deleting the task with id" +id)
  const newTasks = tasks.filter((task)=>{return task._id!==id})
  setTasks(newTasks);
}
//Edit any Task
const editTask = async (id, title, description,tag) =>{
  const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },

  body: JSON.stringify({title, description, tag})
});
const json = await response.json();
console.log(json);

let newTasks = JSON.parse(JSON.stringify(tasks))
//Logic to edi in client
for(let index = 0; index < newTasks.length; index++){
  const element = newTasks[index];
  if(element._id === id){
    newTasks[index].title = title;
    newTasks[index].description = description;
    newTasks[index].tag = tag;
    break;
  }
}
setTasks(newTasks);
}

  return (
    <TaskContext.Provider value={{ tasks, setTasks,  addTask, deleteTask, editTask, getTasks }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;

 