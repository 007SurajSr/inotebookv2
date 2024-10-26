const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Task = require("../module/Task");

//ROUTE 1: Get All the tasks Using: GET "/api/tasks/getuser". Login required
router.get("/fetchalltasks", fetchuser, async (req, res) => {
  try {
    const task = await Task.find({ user: req.user.id });
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new Task Using: POST "/api/notes/addnote". Login required
router.post("/addtask", fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5}),
    body("status","Pending" )
  ],
  async (req, res) => {
     try {
      const { title, description, tag, status } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({
        title,
        description,
        tag,
        status,
        user: req.user.id,
      })
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  //ROUTE 3: Update an existing Note Using: put "/api/notes/updatenote". Login required
  router.put("/updatetask/:id", fetchuser,  async (req, res) => {
    try {
    const { title, description, tag, status } = req.body;
    // Create a new note object
    const newTask = {};
     if(title){newTask.title= title};
     if(description){newTask.description = description};
     if(tag)(newTask.tag= tag); 
     if(status)(newTask.status = status); 
    
      

     //Find the note to be updated and update it
     let task = await Task.findById(req.params.id);
     if(!task){return res.status(404).send("Not found")}

     if(task.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
     }
     task = await Task.findByIdAndUpdate(req.params.id, {$set: newTask},{new:true})
     res.json({task});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
     });

      //ROUTE 4: DELETE an existing Note Using: DELETE "/api/notes/deletenote". Login required
  router.delete("/deletetask/:id", fetchuser,  async (req, res) => {
    try {
    const { title, description, tag } = req.body;
 
     //Find the note to be deleted and delete it
     let task = await Task.findById(req.params.id);
     if(!task){return res.status(404).send("Not found")}
    
     // Allow deletion only if user owns this note
     if(task.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
     }
     task = await Task.findByIdAndDelete(req.params.id)
     res.json({ "Success": "Task has been deleted", task: task});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    });


module.exports = router;
