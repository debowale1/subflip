/* eslint-disable import/extensions */
import express from 'express'
import { protect, grantAccessTo } from '../middlewares/index.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.patch('/updateMe', protect, userController.updateMe)
router.delete('/deleteMe', protect, userController.deleteMe)
router.get('/myDetails', protect, userController.myDetails, userController.getUserById)
// router.post('/create', )

router.use(protect)
router.use(grantAccessTo('admin'))

router.route('/')
      .get(userController.getAllUser)
      .post(userController.createUser)
      
router.route('/:id')
      .get(userController.getUserById)
      .patch(userController.updateUser)
      .delete(userController.deleteUserById)

export default router
