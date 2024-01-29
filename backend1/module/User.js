const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    
    },
    email:{
        type: String,
        require : true,
        unique : true
    }, 
    password:{
        type: String,
        require : true
    }, 
    date:{
        type: Date,
        dafault: Date.now
    }
});
const User =  mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports =  User;
// module.exports = mongoose.model('user', UserSchema);