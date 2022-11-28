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
      res.json({ msg: "Success" })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
