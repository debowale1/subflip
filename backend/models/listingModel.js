import mongoose from 'mongoose'
import slugify from 'slugify'

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

// create slug for each title before save
listingSchema.pre('save', function(next){
  this.slug = slugify(this.title, { lower: true })
  next()
})

// populate users from id
listingSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'firstname lastname'
  })
  next()
})

const Lisitng = mongoose.model('Listing', listingSchema)

export default Lisitng