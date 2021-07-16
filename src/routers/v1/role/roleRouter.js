import express from 'express'
import {
   getRole,
   getById,
   createData,
   updateData,
   deleteData
} from '../../../controllers/role/roleController'
import project from '../../../../config/project.config'

import { requireAuth } from '../../../services/users/usersService'

const router = express.Router()
const url = `${project.api_prefix}/role`

router.get(url, requireAuth, getRole)
router.get(`${url}/:id`, requireAuth, getById)
router.post(`${url}/create`, requireAuth, createData)
router.put(`${url}/:id`, requireAuth, updateData)
router.delete(`${url}/:id`, requireAuth, deleteData)

export default router
