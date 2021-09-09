/* eslint-disable import/extensions */
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js'

const app = express()
dotenv.config()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// body parser
app.use(express.json())

app.get('/api/v1/ping', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Welcome to subflip',
	})
})

app.use('/api/v1/users', userRouter)

export default app
