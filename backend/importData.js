/* eslint-disable import/extensions */
import dotenv from 'dotenv'
import faker from 'faker'
import connectDB from "./config/db.js";
import Lisitng from "./models/listingModel.js";

dotenv.config()
connectDB()

const importData = async () => {
  const users = ["615dbfb4ff71bfa748b09be1", "6154bf77cb620b6714f86954", "614c3ae0d1f3a0dc2d5b87b4", "615e17378c07b42f1e07cf04"]
  try {
    let listings
    for(let i = 0; i < 20; i++){
     // eslint-disable-next-line no-await-in-loop
     listings = await Lisitng.insertMany({
      user: users[Math.floor(Math.random() * (users.length - 1))],
      title: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      tags: ["tag1", "tag2", "tag3"]
      })
    }
    console.log(listings);
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
}

const deleteData = async () => {
  try {
    await Lisitng.deleteMany()
    process.exit(1)
  } catch (error) {
    console.log(error);
  }
}

if(process.argv[2] === '--import'){
  importData()
}

if( process.argv[2] === '--delete'){
  deleteData()
}