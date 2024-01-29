// const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://8700suraj:21hJIFETV1vdRFDL@testt-db.5igjwzu.mongodb.net/?retryWrites=true&w=majority"

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connect to Mongo Successfully");
//     })
// }

// const user = require('./module/module')

// module.exports = connectToMongo;


const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://8700suraj:21hJIFETV1vdRFDL@testt-db.5igjwzu.mongodb.net/?retryWrites=true&w=majority"); // ATLASS
mongoose.connect("mongodb+srv://8700suraj:21hJIFETV1vdRFDL@testt-db.5igjwzu.mongodb.net/inotebook"); //COMPASS


// const user = require('./module/User')

// async function insert()
// {
//     await user.create({
//         name: 'Suraj',
//         email: '87ss1usrsaj@gmail.com',
//         password: '212',
//           date :  '20102023'
//     });
// }
// insert();



http.listen(4000, function(){
    console.log('Server is working now');
});

