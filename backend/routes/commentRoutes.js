/* eslint-disable import/extensions */
import express from 'express'
import commentController from '../controllers/commentController.js'
import { protect, grantAccessTo } from '../middlewares/index.js'

const router = express.Router({ mergeParams: true })

router.route('/')
      .get(commentController.getAllComments)
      .post(
            protect, 
            grantAccessTo('user'), 
            commentController.setUserAndListingIds, 
            commentController.createComment
            )

router.route('/:id')
      .get(commentController.getCommentById)   
      .patch(commentController.updateComment)   
      .delete(commentController.deleteCommentById)

export default router