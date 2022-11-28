import express, { Router } from "express"

const router: Router = express.Router()

const registerController = require("./registerController")

router.use("/register", registerController)

module.exports = router
