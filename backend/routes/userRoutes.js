/* eslint-disable import/extensions */
import express from 'express'
import { protect, grantAccessTo } from '../middlewares/index.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.patch('/updateMe', protect, userController.updateMe)
router.post('/create', protect, grantAccessTo('admin'), userController.createUser)


router.route('/').get(protect, userController.getAllUser)

export default router
