import mongoose from 'mongoose'

const { Schema } = mongoose
const userSchema = Schema({})

const User = mongoose.model('User', userSchema)
export default User
