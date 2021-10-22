/* eslint-disable import/extensions */
import { Router } from 'express'
import { grantAccessTo, protect } from '../middlewares/index.js'
import listingController from '../controllers/listingController.js'
import commentRouter from './commentRoutes.js'


const router = Router()

// using express nexted routes to write comment on a listing
router.use('/:listingId/comments', commentRouter)

router.route('/')
      .get(listingController.getAll)
      .post(listingController.create)

router.route('/:id')
      .get(listingController.getListingById)
      .patch(protect, listingController.updateListing)
      .delete(protect, grantAccessTo('admin', 'moderator'),  listingController.deleteListingById)



export default router