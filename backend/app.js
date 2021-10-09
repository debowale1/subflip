/* eslint-disable import/extensions */
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import listingRouter from './routes/listingRoutes.js'

const app = express()
dotenv.config()

// set security headers
app.use(helmet())
// environment logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// body parser
app.use(express.json({ limit: '10kb' }))
// rate limiting
const limiter = rateLimit({
	max: 100,
	windowMs: 60*60*1000,
	message: 'Too many requests from this IP. Please try again in an hour'
})
app.use('/api', limiter)
// serving static files
app.use(express.static(`{__dirname}/public`))

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
