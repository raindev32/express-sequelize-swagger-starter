import {
   getRole,
   getRoleById,
   createData,
   dataExists,
   updateData,
   deleteData
} from "../../services/role/roleService"
import {
   ApiResponse,
   ApiError,
} from '../../handling/errorHandling'
import { extractTokenProfile } from '../../services/securityService'

/**
 * get all roles
 * @route GET /api/v1/role
 * @group Roles - Api Documentation
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
 * @returns {ApiError.model} 422 - Role not found!
 */
exports.getRole = async (req, res, next) => {
   try {
      const data = await getRole()
      if (data) {
         next(new ApiResponse(res, 200, data, {
            success: true,
            message: 'Ok'
         }))
      } else {
         next(new ApiError(404, 'Data not found'))
      }
   } catch (error) {
      next(new ApiError(404, 'Data not found', error))
   }
}

/**
 * get detail role
 * @route GET /api/v1/role/{roleId}
 * @group Roles - Roles
 * @param {integer} roleId.path - roleId event - eg: 1
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - Role not found!
 * @security JWT
 */
exports.getById = async (req, res, next) => {
   const id = req.params.id
   try {
      const data = await getRoleById(id)
      if (data) {
         next(new ApiResponse(res, 200, data, {
            success: true,
            message: 'Ok'
         }))
      } else {
         next(new ApiError(404, 'Data not exists'))
      }
   } catch (error) {
      next(new ApiError(404, 'Data not exists', error))
   }
}

/**
 * @typedef RolesRegister
 * @property {string} name.required - firstName - eg: user
 * @property {string} code.required - code and choose one - eg: adm/usr
 */
/**
 * To create new role
 * @route POST /api/v1/role/create
 * @group Roles - Roles
 * @param {RolesRegister.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user info
 * @returns {ApiError.model} 422 - Failed to login
 */
exports.createData = async (req, res, next) => {
   const data = req.body
   try {
      const create = await createData(data)
      if (create) {
         next(new ApiResponse(res, 200, create, {
            success: true,
            message: 'Create data succesfully'
         }))
      } else {
         next(new ApiError(400, 'Cannot create data'))
      }
   } catch (error) {
      next(new ApiError(400, 'Cannot create data'))
   }
}

/**
 * @typedef RoleUpdate
 * @property {string} name.required - firstName - eg: user
 * @property {string} code.required - code and choose one - eg: adm/usr
 */
/**
 * update user role
 * @route PUT /api/v1/role/{roleId}
 * @group Roles - Roles
 * @param {integer} roleId.path - roleId event - eg: 1
 * @param {RoleUpdate.model} request.body.required - data for request
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of user role info
 * @returns {ApiError.model} 422 - Role not found!
 * @security JWT
 */
exports.updateData = async (req, res, next) => {
   const id = req.params.id
   const data = req.body
   try {
      const exists = await dataExists(id)
      if (exists) {
         const update = await updateData(id, data)
         if (update) {
            next(new ApiResponse(res, 200, update, {
               success: true,
               message: 'Ok'
            }))
         } else {
            next(new ApiError(400, 'Cannot update data'))
         }
      } else {
         next(new ApiError(404, 'Data not exists'))
      }
   } catch (error) {
      next(new ApiError(400, 'Cannot update data'))
   }
}

/**
 * delete role
 * @route DELETE /api/v1/role/{roleId}
 * @group Roles - Roles
 * @param {integer} roleId.path - roleId event
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - An object of role info
 * @returns {ApiError.model} 422 - Role not found!
 * @security JWT
 */
exports.deleteData = async (req, res, next) => {
   const id = req.params.id
   try {
      const userLogIn = extractTokenProfile(req)
      const userRoleData = await deleteData(id, userLogIn.id)
      if (userRoleData) {
        return next(new ApiResponse(res, 200, 'Succeeded to delete role', { message: 'Succeeded to delete role' }))
      }
      return next(new ApiError(422, 'Failed to delete pricing'))
   } catch (error) {
      next(new ApiError(400, 'Cannot delete data'))
   }
}