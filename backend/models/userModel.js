import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose
const requiredString = {
  type: String,
	required: true,
  trim: true,
}
const userSchema = Schema({
	firstname: {
		...requiredString,		
	},
	lastname: {
		...requiredString
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'email must be provided'],
	},
	username: {
		...requiredString,
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Please provide a password'],
		min: 8,
		select: false
	},
	passwordConfirm: {
		type: String,
		trim: true,
		required: [true, 'Passwords must match'],
		validate: {
			validator: function (el) {
				return el === this.password
			},
		},
	},
	role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: "role can only be either user, or admin"
    },
    default: 'user'
  },
	phoneNumber: {
		type: String,
	},
	photo: String,
	facebookUrl: {
		type: String,
	},
	twitterUrl: {
		type: String,
	},
	active: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true },
})

userSchema.virtual('fullname').get(function(){
	return `${this.firstname} ${this.lastname}`
})

// DOCUMENT MIDDLEWARE: pre save hook
userSchema.pre('save', async function(next){
	if(!this.isModified('password')) return next()
	this.password = await bcrypt.hash(this.password, 12)
	this.passwordConfirm = undefined
	next()
})
// QUERY MIDDLEWARE
userSchema.pre(/^find/, function(next){
	this.find({ active: true })
	next()
})

// compare provided password and db password for user authentication
userSchema.methods.comparePassword = async function(enteredPassword, userPassword) {
	return await bcrypt.compare(enteredPassword, userPassword)
}

const User = mongoose.model('User', userSchema)
export default User
