/* eslint-disable import/extensions */
import { Router } from 'express'
import { protect } from '../middlewares/index.js'
import authController from '../controllers/authController.js'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
// Password reset routes
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updateMyPassword/',protect, authController.updatePassword)

export default router