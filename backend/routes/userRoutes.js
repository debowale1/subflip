/* eslint-disable import/extensions */
import express from 'express'
import userController from '../controllers/userController.js'


const router = express.Router()

router.post('/signup', userController.createUser)

router.route('/').get(userController.getAllUser)

export default router
