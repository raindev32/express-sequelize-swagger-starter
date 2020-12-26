import express from 'express'
import {
   getData,
   getDataId,
   createData,
   updateData,
   deleteData
} from '../../../controllers/user/userController'

const router = express.Router();
const url = '/api/v1/user'

router.get(url, getData)
router.get(`${url}/:id`, getDataId)
router.post(url, createData)
router.put(`${url}/:id`, updateData)
router.delete(`${url}/:id`, deleteData)

export default router;