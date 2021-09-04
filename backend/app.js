const express = require('express')
const app = express()

app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Welcome to subflip',
   })
})

app.listen(9000, '127.0.0.1', () =>{
  console.log('server running on port 9000');
})