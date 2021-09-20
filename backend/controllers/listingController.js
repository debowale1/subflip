/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Listing from '../models/listingModel.js'

const listingController = {
  create: async (req, res) => {
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
  },
  getAll: async (_, res,  next) => {
    try {
      const listings = await Listing.find().sort({ createdAt: -1}).limit(5)
      
      res.status(200).json({
        status: 'success',
        data: {
          listings
        }
      })
    } catch (error) {
      next(res.status(500).json(error))
    }

  }
}

export default listingController