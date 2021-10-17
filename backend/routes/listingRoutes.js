/* eslint-disable import/extensions */
import { Router } from 'express'
import listingController from '../controllers/listingController.js'
// import commentController from '../controllers/commentController.js'
import commentRouter from './commentRoutes.js'
// import { protect, grantAccessTo } from '../middlewares/index.js'

const router = Router()

// using express nexted routes to write comment on a listing
router.use('/:listingId/comments', commentRouter)

router.route('/').get(listingController.getAll).post(listingController.create)

router.route('/:id')
      .get(listingController.getListingById)
      .patch(listingController.updateListing)
      .delete(listingController.deleteListingById)



export default router