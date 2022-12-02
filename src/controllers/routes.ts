import express, { Router } from "express"

const router: Router = express.Router()

const registerController = require("./registerController")
const loginController = require("./loginController")

router.use("/register", registerController)
router.use("/login", loginController)

module.exports = router
