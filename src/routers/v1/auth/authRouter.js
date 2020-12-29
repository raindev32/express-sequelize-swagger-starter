import express from 'express'
import {
   login,
   register
} from '../../../controllers/auth/authController'

const router = express.Router();
const url = '/api/v1/auth'

// Login
router.post(`${url}/login`, login)

// Register
router.post(`${url}/register`, register)

// router.get(`${url}/:id`, getDataId)
// router.post(`${url}/create`, createData)
// router.put(`${url}/:id`, updateData)
// router.delete(`${url}/:id`, deleteData)

export default router;