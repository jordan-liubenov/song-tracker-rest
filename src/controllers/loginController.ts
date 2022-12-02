import express, { Router } from "express"

const { login } = require("../services/userService")

const router: Router = express.Router()

const jwt = require("jsonwebtoken")

const settings: ServerSettings = require("../configurations/settings")

router.post("/", async (req, res) => {
  try {
    const result = await login(req)

    if (result.userNotExist) {
      res.json({ noUser: true })
    }
    if (result.incorrectPass) {
      res.json({ incorrectPass: true })
    }
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
