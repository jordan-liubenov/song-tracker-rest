const User = require("../models/User")
const setting: ServerSettings = require("../configurations/settings")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SALT_RNDS: number = setting.saltRounds

interface ErrorObj {
  usernameTaken?: boolean
  emailTaken?: boolean
  userNotExist?: boolean
  passwordIncorrect?: boolean
}

interface UserService {
  Validator: any
  register: (req: RegisterRequest) => undefined | ErrorObj | Promise<void>
  login: (req: LoginRequest) => undefined | ErrorObj
}

interface LoginRequest {
  body: {
    username: string
    password: string
  }
}

interface RegisterRequest {
  body: {
    email: string
    username: string
    password: string
    repeatPassword: string
  }
}

class UserService {
  private validator: Validator = new Validator()

  public static async register(req: RegisterRequest) {
    const email: string = req.body.email
    const username: string = req.body.username
    const password: string = req.body.password
    const repeatPassword: string = req.body.repeatPassword

    if (!validateAll(email, username, password) || password !== repeatPassword) {
      return
    }

    // Search for already existing user by email/username
    const usernameQuery = {
      username: username,
    }
    const findUser = await User.findOne(usernameQuery)
    if (findUser != null) {
      const errorObj: ErrorObj = {
        usernameTaken: true,
      }
      return errorObj
    }
    const emailQuery = {
      email: email,
    }
    const findEmail = await User.findOne(emailQuery)
    if (findEmail != null) {
      const errorObj: ErrorObj = {
        emailTaken: true,
      }
      return errorObj
    }

    try {
      let salt = await bcrypt.genSalt(SALT_RNDS)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUserDocument = new User({
        email: email,
        username: username,
        password: hashedPassword,
      })

      // await newUserDocument.save() // Save document to Mongo
      console.log(newUserDocument)
      console.log("--------------------------")
    } catch (error) {
      console.log(error)
    }
  }

  public static async login(req: LoginRequest) {
    const username: string = req.body.username
    const password: string = req.body.username

    // In case of user not existing with given username
    const usernameQuery = {
      username: username,
    }
    const findUsername = await User.findOne(usernameQuery)
    console.log(findUsername)
    if (findUsername == null) {
      const errorObj: ErrorObj = {
        userNotExist: true,
      }
      return errorObj
    }

    // In case of password being incorrect
  }
}

module.exports = UserService
