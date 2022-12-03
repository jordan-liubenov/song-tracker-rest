import express, { Router } from "express"
const router: Router = express.Router()
import { UserService } from "../services/UserService"

router.post("/", async (req, res) => {
  try {
    const result = await UserService.register(req)
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
