/* eslint-disable import/extensions */
import { Router } from 'express'
import authController from '../controllers/authController.js'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
// Password reset routes
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)

export default router