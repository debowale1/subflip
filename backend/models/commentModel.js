import mongoose from 'mongoose'

const {Schema} = mongoose

const commentSchema = new Schema({
  desc: {
    type: String,
    required: [true, "comment cannot be empty"]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please log in to write a comment']
  },
  listing: {
    type: mongoose.Schema.ObjectId,
    ref: 'Listing',
    required: [true, 'A comment requires a listing']
  },
},{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

// populate users that wrote comments when a certain listing is requested 
commentSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'firstname lastname'
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
