import express  from 'express'
import dotenv from 'dotenv'
import connetDb  from '../backend/config/db.js'

const app = express()
dotenv.config()

connetDb()

app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Welcome to subflip',
   })
})


export default app