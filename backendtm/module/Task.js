const mongoose = require('mongoose')
const { Schema } = mongoose;

const tastSchema = new mongoose.Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     
    },
    title:{
        type: String,
        require: true,
        
    },
    description:{
        type: String,
        require: true
        
    }, 
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String, 
        default: 'pending', 
        enum:  'completed'

    
},  
});

module.exports = mongoose.model('task', tastSchema);