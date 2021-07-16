import { getImageUrl } from '../../utils/url'
import { extractTokenProfile } from '../../services/securityService'
import {
  login,
  register
} from '../../services/auth/authService'
import { getUserById } from '../../services/users/usersService'
import {
  ApiResponse,
  ApiError
} from '../../services/errorHandlingService'
import project from '../../../config/project.config'

// import { getDataId as getCityDataById } from '../../services/regional/cityService'

/**
 * @typedef ResponseUserInfo
 * @property {string} name.required - name - eg: John
 * @property {string} phone_number.required - phone_number - eg: 08227297****
 * @property {string} email - email - eg: user@gmail.com
 * @property {string} birth.required - birth date
 * @property {boolean} gender.required - gender (1 for male 0 for woman) - eg: 1
 * @property {boolean} createdAt.required - created date
 * @property {boolean} updatedAt.required - updated date
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/auth/me
 * @group Auth - Api Documentation
 * @returns {ResponseUserInfo.model} 200 - user info
 * @returns {ApiError.model} 404 - User not found!
 * @security JWT
 */
exports.getMyUser = async (req, res, next) => {
  try {
    const userLogIn = extractTokenProfile(req)
    const userData = await getUserById(userLogIn.id, true)
    if (userData) {
      if (userData.image) {
        userData.image = getImageUrl(userData.image)
      }
      // if (userData && userData.storeId) {
      //   const cityName = await getCityDataById(userData.storeId, true)

      //   if (cityName && cityName.name) {
      //     userData.storeName = cityName.name
      //   }
      // }

      // if (userData['memberUpgrade.memberType.image']) {
      //   userData['memberUpgrade.memberType.image'] = getImageUrl(userData['memberUpgrade.memberType.image'])
      // }
      // const subscription = await getUserActiveSubscription(userLogIn.id, true)
      // if (subscription) {
      //   const subscriptionFiltered = subscription.filter(filtered => filtered.id)
      //   if (subscriptionFiltered && subscriptionFiltered.length > 0) {
      //     userData.subscription = subscriptionFiltered[0]
      //   } else {
      //     userData.subscription = {}
      //   }
      // }
      next(new ApiResponse(res, 200, userData, {}))
    } else {
      next(new ApiError(404, 'User not found!'))
    }
  } catch (error) {
    next(new ApiError(404, 'User not found!', error))
  }
}

/**
 * @typedef UserRegister
 * @property {string} name.required - name - eg: user
 * @property {string} phone_number.required - phone_number - eg: 082277576032
 * @property {string} email.required - lastName - eg: admin@mail.com
 * @property {string} birth.required - lastName - eg: 2020-12-27
 * @property {integer} gender.required - gender (1 for male 0 for woman) - eg: 1
 * @property {string} password.required - User Email - eg: 123456
 * @property {integer} role_id.required -  role_id (1 for admin 2 for user) - eg: 2
 */
/**
 * To create new user using email
 * @route POST /api/v1/auth/register
 * @group Auth - Api Documentation
 * @param {UserRegister.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - Failed to login
 */
exports.register = async (req, res, next) => {
  const {
    name,
    phone_number,
    email,
    birth,
    gender,
    password,
    role_id
  } = req.body

  const userData = {
    name,
    phone_number,
    email,
    birth,
    gender,
    password,
    role_id
  }

  if (!req.body.email && !req.body.phone) {
    next(new ApiError(409, 'Email or phone can\'t be null'))
  } else {
    const registerData = await register(userData, next)

    if (registerData) {
      next(new ApiResponse(res, 201, { message: 'Account created' }))
    }
    next(new ApiError(409, 'Failed to register users'))
  }

}

/**
 * @typedef UserLogin
 * @property {string} email.required - User Email - eg: admin@mail.com
 * @property {string} password.required - Password - eg: 123456
 */
/**
 * To create new user using email
 * @route POST /api/v1/auth/login
 * @group Auth - Api Documentation
 * @param {UserLogin.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - Failed to login
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  const dataLogin = await login({ email, password }, next)

  if (dataLogin) {
    next(new ApiResponse(res, 200, dataLogin, { message: 'Login Success' }))
  } else {
    next(new ApiError(422, 'Failed to login'))
  }
}