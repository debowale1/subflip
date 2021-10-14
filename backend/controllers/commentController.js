/* eslint-disable import/extensions */
import Comment from '../models/commentModel.js'


const commentController = {
  create: async (req, res, next) => {
    const { desc, listing } = req.body
    try {
      const comment = await Comment.create({
        desc,
        user: req.user.id,
        listing
      })
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
    try {
      const comments = await Comment.find().populate('user')
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