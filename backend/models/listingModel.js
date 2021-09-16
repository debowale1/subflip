import mongoose from 'mongoose'

const requiredString = {
  type: String,
  trim: true,
}
const listingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A listing must be created by a user']
  },
  title: {
    ...requiredString,
    required: [true, 'A listing must have a title']
  }, 
  slug: String,
  description: {
    ...requiredString,
    required: [true, 'A listing must have a description']
  },
  active: {
    type: Boolean,
    default: true
  },
  expiryData: {
    type: Date,
  },
  tags:  [String]
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

const Lisitng = mongoose.model('Listing', listingSchema)

export default Lisitng