/* eslint-disable import/extensions */
import { Router } from 'express'
import listingController from '../controllers/listingController.js'
import commentController from '../controllers/commentController.js'
import { protect, grantAccessTo } from '../middlewares/index.js'

const router = Router()

router.route('/').get(listingController.getAll).post(listingController.create)
router.route('/:id').get(listingController.getListingById)

// writing a comment under a listing
// POST listings/2f6735/comments
// GET listings/2f6735/comments
// POST listings/2f6735/comments/4fgt72987
router.route('/:listingId/comments').post(protect, grantAccessTo('user'), commentController.createComment)

export default router