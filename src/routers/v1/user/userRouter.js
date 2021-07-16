import express from 'express'
import {
  getData,
  getDataId,
  createData,
  updateData,
  deleteData
} from '../../../controllers/user/userController'
import project from '../../../../config/project.config'

import { requireAuth } from '../../../services/users/usersService'

const router = express.Router()
const url = `${project.api_prefix}/user`

router.get(url, requireAuth, getData)
router.get(`${url}/:id`, requireAuth, getDataId)
router.post(`${url}/create`, requireAuth, createData)
router.put(`${url}/:id`, requireAuth, updateData)
router.delete(`${url}/:id`, requireAuth, deleteData)

export default router
