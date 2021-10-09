/* eslint-disable import/extensions */
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import listingRouter from './routes/listingRoutes.js'
import rateLimit from 'express-rate-limit'

const app = express()
dotenv.config()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// body parser
app.use(express.json())

const limiter = rateLimit({
	max: 100,
	windowMs: 60*60*1000,
	message: 'Too many requests from this IP. Please try again in an hour'
})

app.use('/api', limiter)

app.get('/api/v1/ping', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Welcome to subflip',
	})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/listings', listingRouter)

// Unknown route
app.get('*', async (req, res) => {
	console.log('Not Found')
	res.redirect('/')
})

export default app
