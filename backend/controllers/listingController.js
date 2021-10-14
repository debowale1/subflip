/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Listing from '../models/listingModel.js'

const listingController = {
  create: async (req, res, next) => {
    try {
      const listing = await Listing.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          listing
        }
      })
    } catch (error) {
      // res.status(500).json(error)
      return next(error)
    }
  },
  getListingById: async (req, res, next) => {
    const {id} = req.params
    try {
      const listing = await Listing.findById(id).populate('comments')

      // for populating fields
      // const listing = await Listing.findById(id).populate({
      //   path: 'user', 
      //   select: 'firstname lastname'
      // })

      res.status(200).json({
        status: 'success',
        data: {
          listing
        }
      })
    } catch (error) {
      // res.status(500).json(error)
      return next(error)
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