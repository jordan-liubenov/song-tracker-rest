const User1 = require("../models/User")
const setting1: ServerSettings = require("../configurations/settings")

const bcrypt1 = require("bcrypt")
const jwt1 = require("jsonwebtoken")
const SALT_RNDS1: number = setting.saltRounds

interface RegisterRequest {
  body: {
    email: string
    username: string
    password: string
    repeatPassword: string
  }
}

interface LoginRequest {
  body: {
    username: string
    password: string
  }
}
// First objective, handle user NOT existing
async function login(req: LoginRequest) {
  const username: string = req.body.username
  const password: string = req.body.username

  // In case of user not existing with given username
  const usernameQuery = {
    username: username,
  }
  const findUsername = await User.findOne(usernameQuery)
  console.log(findUsername)
  if (findUsername == null) {
    const errorObj = {
      userNotExist: true,
    }
    return errorObj
  }

  // In case of password being incorrect
}

async function register(req: RegisterRequest) {
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
    const errorObj = {
      usernameTaken: true,
    }
    return errorObj
  }
  const emailQuery = {
    email: email,
  }
  const findEmail = await User.findOne(emailQuery)
  if (findEmail != null) {
    const errorObj = {
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

function validateAll(email: string, username: string, password: string): boolean {
  let allValid = false
  if (validateEmail(email) && validateUsername(username) && validatePassword(password)) {
    allValid = true
  } else {
    allValid = false
  }
  return allValid
}

function validateEmail(email: string): boolean {
  let isValid = true

  let reg = /^[A-Za-z\d]+[@][A-Za-z]+\.[a-z]+$/g
  if (email.length > 0) {
    if (reg.test(email)) {
      isValid = true
    } else {
      isValid = false
    }
  } else {
    isValid = true
  }

  return isValid
}

function validateUsername(username: string): boolean {
  let isValid = true
  if (username.length >= 6) {
    isValid = true
  } else {
    isValid = false
  }
  return isValid
}

function validatePassword(password: string): boolean {
  let isValid = true
  if (password.length >= 8) {
    if (checkForNumber(password) && checkForUpper(password)) {
      //if it has atleast one Num, and one Uppercase char, return true
      isValid = true
    } else {
      isValid = false
    }
  } else {
    isValid = false
  }
  return isValid
}

function checkForNumber(pass: string): boolean {
  //check if password has atleast 1 number
  let hasNum = false
  for (let i = 0; i < pass.length; i++) {
    let current = pass.charAt(i)
    if (Number(current)) {
      hasNum = true
    }
  }
  return hasNum
}

function checkForUpper(pass: string): boolean {
  let hasUpper = false
  for (let i = 0; i < pass.length; i++) {
    if (pass.charAt(i) == pass.charAt(i).toUpperCase()) {
      hasUpper = true
    }
  }
  return hasUpper
}

module.exports = {
  register,
  login,
}
