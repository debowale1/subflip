// eslint-disable-next-line prettier/prettier
import app from './app'

const PORT = process.env.PORT || 9000
app.listen(PORT, '127.0.0.1', () => {
	console.log(`server running on port ${PORT}`)
})
