/* eslint-disable import/extensions */
import express from 'express'
import commentController from '../controllers/commentController.js'
import { protect, grantAccessTo } from '../middlewares/index.js'

const router = express.Router()

router.route('/')
      .post(protect, grantAccessTo('user'), commentController.create)
      .get(commentController.getAllComments)

export default router