import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import project from '../../config/project.config'

const getRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

export function sha512 (password, salt) {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return hash.digest('hex')
}

export function saltHashPassword (password) {
  let salt = getRandomString(65)
  let hash = sha512(password, salt)

  return {
    salt, hash
  }
}

export function isValidPassword (password, hash, salt) {
  let pwdHash = sha512(password, salt)
  return pwdHash === hash
}

export function generateToken (obj, temp = false, time = 10) {
  return jwt.sign(obj, project.auth_secret, {
    expiresIn: temp ? time : project.auth_expire // in seconds
  })
}

export function getToken (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    }
    return null
  }
  return null
}

export function extractToken (req) {
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

export function extractTokenProfile (req) {
  const jwtToken = extractToken(req)
  if (jwtToken === 'null' || jwtToken === 'undefined') {
    return {}
  }

  if (jwtToken) {
    return jwt.verify(jwtToken, project.auth_secret)
  }
  return {}
}
