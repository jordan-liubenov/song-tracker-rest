import express from "express"
import bodyParser from "body-parser"

const cookieParser = require("cookie-parser")
const cors = require("./middleware/cors")

const app = express()

const routes = require("./controllers/routes")

require("dotenv").config()

const connectToDB = require("./configurations/db")

const settings: ServerSettings = require("./configurations/settings")

const Main = (): void => {
  try {
    connectToDB()
    app.listen(settings.port, () =>
      console.log(`<>>> Server is live on port ${settings.port} <<<>`)
    )
  } catch (error) {
    console.log(`!!! DB Error: ${error} !!!`)
  }

  app.use(cors())

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(routes)
}
Main()
