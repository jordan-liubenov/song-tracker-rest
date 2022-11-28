import express, { Router } from "express"

const router: Router = express.Router()

router.post("/", async (req, res) => {
  console.log(req.body)
})

module.exports = router
