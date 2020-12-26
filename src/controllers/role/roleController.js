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
exports.deleteData = async (req, res, next) => {
   const id = req.params.id
   try {
      const exists = await dataExists(id)
      if (exists) {
         const deleted = await deleteData(id)
         if (deleted) {
            next(new ApiError(res, 200, deleted, {
               success: true,
               message: 'Ok'
            }))
         } else {
            next(new ApiError(400, 'Cannot delete data'))
         }
      } else {
         next(new ApiError(404, 'Data not exists'))
      }
   } catch (error) {
      next(new ApiError(400, 'Cannot delete data'))
   }
}