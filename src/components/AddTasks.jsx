import React, { useContext, useState } from "react";
import TaskContext from "./Context/TaskContext";
 

const AddTasks = (  ) => {
    const context = useContext(TaskContext)
    const {addTask} = context;
       

    const [task, setTask] = useState({title: "", description: "", tag:" "})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addTask(task.title , task.description, task.tag);
        setTask({title: "", description: "", tag:" "});
        //props.showAlert("Account created Sccessfully", "success")

    }
    const onChange = (e) =>{
      setTask({...task, [e.target.name]: e.target.value})
    }
    return (
    <div className="container my-3">
        <h1>Add a task</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title' 
              aria-describedby="emailHelp" value={task.title}
              onChange={onChange}
            />
            </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'  value={task.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'  value={task.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={task.title.length<5 || task.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>
            Add task
          </button>
        </form>
         
      </div>
  )
}

export default AddTasks;

 