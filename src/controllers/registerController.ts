import express, { Router } from "express"

const { register } = require("../services/userService")
const router: Router = express.Router()

router.post("/", async (req, res) => {
  try {
    const result = await register(req)
    if (typeof result === "object") {
      if (result.usernameTaken || result.emailTaken) {
        res.json({ error: result })
      }
      return
    } else {
      res.status(201).json({ msg: "Success" })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router

/*
Idea: rewrite server (or atleast some of it) in an OOP fashion with classes
*/
