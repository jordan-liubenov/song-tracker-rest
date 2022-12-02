interface Validator {
  validateEmail: (email: string) => boolean
  validateUsername: (username: string) => boolean
  validatePassword: (password: string) => boolean
  checkForNumber: (pass: string) => boolean
  checkForUpper: (pass: string) => boolean
}

class Validator {
  public static validateAll(email: string, username: string, password: string): boolean {
    let allValid = false
    if (validateEmail(email) && validateUsername(username) && validatePassword(password)) {
      allValid = true
    } else {
      allValid = false
    }
    return allValid
  }

  public static validateEmail(email: string): boolean {
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

  public static validateUsername(username: string): boolean {
    let isValid = true
    if (username.length >= 6) {
      isValid = true
    } else {
      isValid = false
    }
    return isValid
  }

  public static validatePassword(password: string): boolean {
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

  private static checkForNumber(pass: string) {
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

  private static checkForUpper(pass: string) {
    let hasUpper = false
    for (let i = 0; i < pass.length; i++) {
      if (pass.charAt(i) == pass.charAt(i).toUpperCase()) {
        hasUpper = true
      }
    }
    return hasUpper
  }
}

module.exports = Validator
