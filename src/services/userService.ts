import { Validator } from "../utility/Validator"

const User = require("../models/User")
const setting: ServerSettings = require("../configurations/settings")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SALT_RNDS: number = setting.saltRounds

export interface UserError {
  usernameTaken?: boolean
  emailTaken?: boolean
  userNotExist?: boolean
  incorrectPass?: boolean
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

export class UserService {
  public static async register(req: RegisterRequest) {
    const email: string = req.body.email
    const username: string = req.body.username
    const password: string = req.body.password
    const repeatPassword: string = req.body.repeatPassword

    if (!Validator.validateAll(email, username, password) || password !== repeatPassword) {
      return
    }

    // Search for already existing user by email/username
    const usernameQuery = {
      username: username,
    }
    const findUser = await User.findOne(usernameQuery)
    if (findUser != null) {
      const error: UserError = {
        usernameTaken: true,
      }
      return error
    }
    const emailQuery = {
      email: email,
    }
    const findEmail = await User.findOne(emailQuery)
    if (findEmail != null) {
      const error: UserError = {
        emailTaken: true,
      }
      return error
    }

    try {
      const salt = await bcrypt.genSalt(SALT_RNDS)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUserDocument = new User({
        email: email,
        username: username,
        password: hashedPassword,
      })

      await newUserDocument.save() // Save document to Mongo
      console.log("--------------------------")
      console.log(newUserDocument)
      console.log("--------------------------")
    } catch (error) {
      console.log(error)
    }
  }

  public static async login(req: LoginRequest) {
    const username: string = req.body.username
    const password: string = req.body.password

    if (username.length == 0 || password.length == 0) {
      return
    }

    // In case of user not existing with given username
    const usernameQuery = {
      username: username,
    }
    const findUsername = await User.findOne(usernameQuery)
    console.log(findUsername)
    if (findUsername == null) {
      const error: UserError = {
        userNotExist: true,
      }
      return error
    }

    // In case of password being incorrect
    const checkPassword = await bcrypt.compare(password, findUsername.password)
    if (!checkPassword) {
      const error: UserError = {
        incorrectPass: true,
      }
      return error
    }

    // If all credentials are valid return jwt token
    return new Promise((resolve, reject) => {
      jwt.sign(
        { _id: findUsername.id, username: findUsername.username },
        setting.secret,
        { expiresIn: "5d" },
        (error: any, token: any) => {
          if (error) {
            return reject(error)
          }
          resolve(token)
        }
      )
    })
  }
}
