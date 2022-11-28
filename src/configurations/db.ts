import mongoose from "mongoose"

let connectionString: string | undefined = process.env.db

const connectToDB = () => {
  mongoose.connect(connectionString)
}

module.exports = connectToDB
