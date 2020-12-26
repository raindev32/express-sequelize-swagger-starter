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