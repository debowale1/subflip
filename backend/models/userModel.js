import mongoose from 'mongoose'

const { Schema } = mongoose
const userSchema = Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: [true, 'email must be unique'],
		required: [true, 'email must be provided'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Please provide a password'],
		min: 8,
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
}, {
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true },
})

const User = mongoose.model('User', userSchema)
export default User
