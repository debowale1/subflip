import mongoose from 'mongoose'


const connectDB = async () => {
  //replace password
  const DB = process.env.MONGO_URL.replace('<PASSWORD>', process.env.MONGO_PASS)
  try {
    const con = await mongoose.connect(DB, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    })
    console.log(`databse connected: ${con.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    
  }
}

export default connectDB
