/* eslint-disable import/extensions */
import app from './app.js'
import connectDB from './config/db.js'

connectDB()

const PORT = process.env.PORT || 9000
app.listen(PORT, '127.0.0.1', () => {
	console.log(`server running on port ${PORT}`)
})
