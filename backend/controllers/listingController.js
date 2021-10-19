/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Listing from '../models/listingModel.js'
import factory from './factory.js'

const listingController = {
  create: factory.createOne(Listing),
  getListingById: factory.getOne(Listing, { path: 'comments' }),
  getAll: factory.getAll(Listing),
  updateListing: factory.updateOne(Listing),
  deleteListingById: factory.deleteOne(Listing)
}

export default listingController