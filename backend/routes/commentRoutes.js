/* eslint-disable import/extensions */
import express from 'express'
import commentController from '../controllers/commentController.js'
import { protect, grantAccessTo } from '../middlewares/index.js'

const router = express.Router({ mergeParams: true })

router.use(protect)

router.route('/')
      .get(commentController.getAllComments)
      .post(
            grantAccessTo('user', 'moderator', 'admin'), 
            commentController.setUserAndListingIds, 
            commentController.createComment
            )

router.route('/:id')
      .get(commentController.getCommentById)   
      .patch(commentController.updateComment)   
      .delete(commentController.deleteCommentById)

export default router