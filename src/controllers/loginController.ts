import express, { Router } from "express"
import { UserError, UserService } from "../services/UserService"
const router: Router = express.Router()
const jwt = require("jsonwebtoken")
const settings: ServerSettings = require("../configurations/settings")

router.post("/", async (req, res) => {
  try {
    const result: Promise<object> | UserError = await UserService.login(req)

    if (typeof result === "object") {
      if (result.userNotExist) {
        res.json({ noUser: true })
      }
      if (result.incorrectPass) {
        res.json({ incorrectPass: true })
      }
    } else {
      jwt.verify(result, settings.secret, (error: any) => {
        if (error) {
          return res.json({ error: error })
        }
        res.json({ result })
      })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
