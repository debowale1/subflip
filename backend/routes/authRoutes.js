/* eslint-disable import/extensions */
import { Router } from 'express'
import authController from '../controllers/authController.js'

const router = Router()

router.route('/register').post(authController.register)

export default router