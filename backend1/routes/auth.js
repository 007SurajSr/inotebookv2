const express = require('express');
const User = require('../module/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Surajisafab$boy';

// Route 1:- Create a user using: POST "/api/auth/createuser". Not required login

router.post('/createuser', [
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 4 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] , async (req,res)=>{ 
  let success = false;
    // If there are errors, return Bad request and the errors                                                            // to make
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
    let user = await  User.findOne({email: req.body.email });
    // console.log(user) To check if user is already exist or not.
    if(user){
      return res.status(400).json({success, errors: "Sorry a user with this email already exists"})
     }  
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password , salt);

     //Create a new User
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please enter a unique value for email', message: err.message})})
     
      // router.get('/',(req,res)=>{
//      console.log(req.body);
//      const user = User(req.body);
//      user.save();
  //    res.send(req.body);
   // res.json({"Nice" : "Welcome"})  //When a new user comes, then show this msg
   const data = {
    user: {
      id: user.id
    }
   } 
   const authtoken = jwt.sign(data, JWT_SECRET);
   success = true;
   res.json({success, authtoken});
   // console.log(jwtData);  //too see the token on the terminal
   //res.json(user)   // too see the details which are sent to the DB
  } catch(error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
})

//Route 2:- Authenticate a User using : POST "/api/auth/login". Not required login

router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
 
] , async (req,res)=>{
  let success = false;
      // If there are errors, return Bad request and the errors                                                            // to make
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email, password} = req.body;
      try{
          let user = await User.findOne({email});
          if(!user){
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credentials'});
          }

          const checkPassword = await bcrypt.compare(password, user.password);
          if(!checkPassword){
            success= false;
            return res.status(400).json({ success, error: 'Please try to login with correct credentials'});
          }

          const data = {
            user: {
              id: user.id
            }
           } 
           const authtoken = jwt.sign(data, JWT_SECRET);
           success = true;
           
           res.json({success, authtoken});

      }catch(error){
        console.error(error.message);
      res.status(500).send("Internal server error occured");

      }

} );

//Route 3:- Get loggedin user Detail using  : POST "/api/auth/getuser". Login is required
router.post('/getuser', fetchuser , async (req , res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
  
}
});
module.exports = router;