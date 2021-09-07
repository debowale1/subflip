import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db'

const app = express()
dotenv.config()

connectDb()

app.get('/api/v1/ping', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Welcome to subflip',
	})
})

app.get('api', (req, res) => {
	res.send('Hello')
	process.exit(1)
})

console.log('welcome')

export default app
