import express from 'express'
import {
   login,
   register,
   getMyUser
} from '../../../controllers/auth/authController'
import project from '../../../../config/project.config'

import { requireAuth } from '../../../services/users/usersService'

const router = express.Router();
const url = `${project.api_prefix}/auth`

// Login
router.post(`${url}/login`, login)
router.get(`${url}/me`, requireAuth, getMyUser)

// Register
router.post(`${url}/register`, register)

// router.get(`${url}/:id`, getDataId)
// router.post(`${url}/create`, createData)
// router.put(`${url}/:id`, updateData)
// router.delete(`${url}/:id`, deleteData)

export default router;