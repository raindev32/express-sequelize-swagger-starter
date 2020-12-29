import jwt from 'jsonwebtoken'
import { hash, unhash } from '../../helpers/password'
import db from '../../models'
import { ApiError } from '../../services/errorHandlingService'

const UserModel = db.users

export const isPhoneExists = async (phone_number) => {
  return UserModel.count({
    where: {
      phone_number
    }
  })
}

export const isEmailExists = async (email) => {
  return UserModel.count({
    where: {
      email
    }
  })
}

export const registerPhone = async (userData, next) => {
  const phoneExists = await isPhoneExists(userData.phone_number)

  if (phoneExists === 0) {
    const dataRegister = UserModel.create({
      name: userData.name,
      phone_number: userData.phone_number,
      email: userData.email,
      birth: userData.birth,
      gender: userData.gender,
      password: await hash(userData.password),
      role_id: userData.role_id
    })

    return dataRegister
  } else {
    next(new ApiError(409, 'Phone already used'))
    return false
  }
}

export const registerEmail = async (userData, next) => {
  const emailExists = await isEmailExists(userData.email)

  if (emailExists === 0) {
    const dataRegister = UserModel.create({
      name: userData.name,
      phone_number: userData.phone_number,
      email: userData.email,
      birth: userData.birth,
      gender: userData.gender,
      password: await hash(userData.password),
      role_id: userData.role_id
    })

    return dataRegister
  } else {
    next(new ApiError(409, 'Email already used'))
    return false
  }
}


export const login = async ({ email, password }, next) => {
  const user = await UserModel.findOne({
    where: {
      email
    }
  })

  if (!user) {
    next(new ApiError(404, user, 'User not found'))
  } else {
    const result = await unhash(password, user.password)

    if (!result) {
      next(new ApiError(403, result, 'password doesn\'t match'))
    } else {
      const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRE
      })

      return { user, token }
    }
  }
}
