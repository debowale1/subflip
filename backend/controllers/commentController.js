/* eslint-disable import/extensions */
import Comment from '../models/commentModel.js'


const commentController = {
  createComment: async (req, res, next) => {

    
    if(!req.body.listing) req.body.listing = req.params.listingId
    if(!req.body.user) req.body.user = req.user.id
    
    try {
      const comment = await Comment.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          comment
        }
      })
    } catch (error) {
      return next(error)
    }
  },
  getAllComments: async (req, res, next) => {
    let filter = {}
    try {
      if(req.params.listingId) filter = {listing: req.params.listingId}
      const comments = await Comment.find(filter).populate('user')
      res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
          comments
        }
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default commentController