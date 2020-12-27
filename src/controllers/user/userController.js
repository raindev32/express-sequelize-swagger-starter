import {
   getDataAllUser,
   getUserById,
   createData,
   dataExists,
   updateData,
   deleteData
} from '../../services/users/usersService'
import {
   ApiResponse,
   ApiError
} from '../../handling/errorHandling' 

/**
 * get all user
 * @route GET /api/v1/user
 * @group User - Api Documentation
 * @param {string} q.query - Query using keyword to all column
 * @param {integer} page.query - Offset of data - eg: 1
 * @param {integer} pageSize.query - Setup limit to selected data - eg: 10
 * @param {string} order.query - Ordering by column can be ascending and descending - eg:-id,name
 * @param {string} field.query - Field filtering to select - eg:id,name
 * @param {integer} relationship.query - Enable/Disable relationship to other table - eg: 0,1
 * @param {integer} paranoid.query - Enable/Disable to get deleted data in table - eg: 0,1
 * @param {string} type.query - If enable will select all data inside table - eg: all
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An array object of user info
 * @returns {ApiError.model} 422 - User not found!
 * @security JWT
 */
exports.getData = async (req, res, next) => {
   try {
      const data = await getDataAllUser();
      if (data) {
         next(new ApiResponse(res, 200,
            data, {
               success: true,
               message: 'Ok'
            }))
      } else {
         next(new ApiError(404, 'Data not found.'))
      }
   } catch (error) {
      next(new ApiError(404, 'Data not found', error))
   }
}

/**
 * get detail user
 * @route GET /api/v1/user/{userId}
 * @group User - User
 * @param {integer} userId.path - userId event - eg: 1
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - User not found!
 * @security JWT
 */
exports.getDataId = async (req, res, next) => {
   try {
      const data = await getUserById(req.params.id)
      if (data) {
         next(new ApiResponse(res, 200, data, {
            success: true,
            message: 'Ok'
         }))
      } else {
         next(new ApiError(404, "can't find data"))
      }
   } catch (error) {
      next(new ApiError(404, "can't find data", error))
   }
}

/**
 * User Register
 * @typedef UserRegister
 * @property {string} name.required - name - eg: user
 * @property {integer} age.required - age - eg: 99
 * @property {integer} role_id.required - role_id (1 for admin 0 for user) - eg: 0
 */
/**
 * To create new user using email
 * @route POST /api/v1/user/create
 * @group User - Application register
 * @param {UserRegister.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - Failed to create user
 * @security JWT
 */
exports.createData = async (req, res, next) => {
   try {
      const create = await createData(req.body)
      if (create) {
         next(new ApiResponse(res, 200, create, {
            success: true,
            message: 'create data succesfully'
         }))
      } else {
         next(new ApiError(400, 'cannot create data'))
      }
   } catch (error) {
      next(new ApiError(400, 'cannot created data', error))
   }
}


/**
 * @typedef UserUpdate
 * @property {string} name.required - name - eg: user
 * @property {integer} age.required - age - eg: 99
 * @property {integer} role_id.required - role_id (1 for admin 0 for user) - eg: 0
 */
/**
 * update user role
 * @route PUT /api/v1/user/{userId}
 * @group User
 * @param {integer} userId.path - userRoleId event - eg: 1
 * @param {UserUpdate.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user role info
 * @returns {ApiError.model} 422 - User role not found!
 * @security JWT
 */
exports.updateData = async (req, res, next) => {
   try {
      const exists = await dataExists(req.params.id)
      if (exists) {
         const updated = await updateData(req.params.id, req.body)
         if (updated) {
            next(new ApiResponse(res, 200, updated, {
               success: true,
               message: 'updated data succesfully'
            }))
         } else {
            next(new ApiError(400, 'cannot update data'))
         }
      } else {
         next(new ApiError(404, "can't find data"))
      }
   } catch (error) {
      next(new ApiError(400, 'cannot update data', error))
   }
}


/**
 * delete user role
 * @route DELETE /api/v1/user/{userId}
 * @group User
 * @param {integer} userId.path - userRoleId event - eg: 1
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user role info
 * @returns {ApiError.model} 422 - User role not found!
 * @security JWT
 */
exports.deleteData = async (req, res, next) => {
   try {
      const exists = await dataExists(req.params.id)
      if (exists) {
         const deleted = await deleteData(req.params.id)
         if (deleted) {
            next(new ApiResponse(res, 200, deleted, {
               success: true,
               message: 'delete data successfully'
            }))
         } else {
            next(new ApiError(400, 'cannot delete data'))
         }
      } else {
         next(new ApiError(404, "can't find data"))
      }
   } catch (error) {
      next(new ApiError(400, 'cannot delete data', error))
   }
}