/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Listing from '../models/listingModel.js'

const listingController = {
  createListing: async (req, res) => {
    // const newListing = new Listing({

    // })
    try {
      const listing = await Listing.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          listing
        }
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default listingController