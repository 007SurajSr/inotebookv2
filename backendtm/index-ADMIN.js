// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.listen(3001, () => {
//     console.log("Server is Running")
// })

const connectToMongo = require('./db')
const express = require('express')
 

 //connectToMongo(); 
const app = express()
const port = 5000

app.use(express.json())   // to send the request in json

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
 

// app.get('/', (req, res) => {
//   res.send('Hello Suraj, Welcome back!') 
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

 