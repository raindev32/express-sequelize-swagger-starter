import express from 'express'
import {
   getRole,
   getById,
   createData,
   updateData,
   deleteData
} from '../../../controllers/role/roleController'

const router = express.Router()
const url = '/api/v1/role'

router.get(url, getRole)
router.get(`${url}/:id`, getById)
router.post(`${url}/create`, createData)
router.put(`${url}/:id`, updateData)
router.delete(`${url}/:id`, deleteData)

export default router
