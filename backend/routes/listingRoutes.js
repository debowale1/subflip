import { Router } from 'express'
// eslint-disable-next-line import/extensions
import listingController from '../controllers/listingController.js'

const router = Router()

router.route('/').get(listingController.getAll).post(listingController.create)

export default router