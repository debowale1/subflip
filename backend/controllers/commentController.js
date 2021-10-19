/* eslint-disable import/extensions */
import Comment from '../models/commentModel.js'
import factory from './factory.js'


const commentController = {
  setUserAndListingIds: (req, res, next) => {
    // set user and listing id to create new comment on listing
    if(!req.body.listing) req.body.listing = req.params.listingId
    if(!req.body.user) req.body.user = req.user.id
    next()
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
  },
  createComment: factory.createOne(Comment),
  getCommentById: factory.getOne(Comment),
  updateComment: factory.updateOne(Comment),
  deleteCommentById: factory.deleteOne(Comment),
}

export default commentController