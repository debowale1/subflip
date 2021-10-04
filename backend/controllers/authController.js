/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import sendEmail from '../utils/email.js'

const signToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '90d'
	})
}

const authController = {
	register: asyncHandler(async (req, res, next) => {
		const { firstname, lastname, email, username, password, passwordConfirm } = req.body
      // check if user with the email already exists
			const user = await User.findOne({ email })

      if(user) return next(res.status(401).json({ status: 'fail', message: 'User already exists. Kindly log in instead'}))

      const newUser = await User.create({
				firstname,
				lastname,
				username,
				email,
				password,
				passwordConfirm
			})

      // generate a token for the user
      const token = signToken(newUser._id) 
			

			res.status(200).json({
				status: 'success',
				token,
				data: {
					newUser,
				},
			})
	}),
	// eslint-disable-next-line consistent-return
	login: asyncHandler(async (req, res, next) => {
		const { username, password } = req.body
			const user = await User.findOne({username}).select('+password')

      if(!user || !(await user.comparePassword(password, user.password))){
        return next(res.status(401).json({ status: 'fail', message: 'username or password is incorrect. Please try again'}))
      }
      // sign token 
			const token = signToken(user._id) 

			res.status(200).json({
				status: 'success',
				token,
				data: {
					user,
				},
			})
	}),
	updatePassword: async(req, res, next) => {
		const {passwordCurrent, password, passwordConfirm} = req.body
		try {
			const user = await User.findById(req.user.id).select('+password')
			if(!user || !(await user.comparePassword(passwordCurrent, user.password))){
				return next(res.status(403).json({ status: 'error', message: "the password provided is incorrect" }));
			}
			user.password = password
			user.passwordConfirm = passwordConfirm
			await user.save();



			const token = signToken(user._id) 

			res.status(200).json({
				status: 'success',
				token,
				data: {
					user,
				},
			})
		} catch (error) {
			return next(error)
		}
	},

	forgotPassword: async (req, res, next) => {
		const { email } = req.body
		try {
			// check if email is registered
			const user = await User.findOne({email})

			if(!user) return next(res.status(404).json({ status: 'fail', message: `User with the email does not exist. Please sign up /api/v1/auth/signup` }))

			const resetToken = user.createPasswordResetToken()
			// save user's reset token
			await user.save({ validateBeforeSave: false }) 

			const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`
			const message = `Forgot your password? please create a new one using this link ${resetURL}. \n If you didn't forget your password, please ignore this message.`

			await sendEmail({
				email: req.body.email,
				subject: 'Your password reset token. (Valid for 10mins)', 
				message
			})

			res.status(200).json({
				status: 'success',
				message: 'We have sent a link to your email. Follow the link to reset your password'
			})
		} catch (error) {
			user.resetPasswordToken = undefined
			user.passwordTokenExpires = undefined
			await user.save({ validateBeforeSave: true })

			return next(res.status(500).json({ message: 'There was a problem sending the email. Please try again!'}))
		}
	},

	resetPassword: async (req, res, next) => {
		// Get user based on the token

		try {
			const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
	
			const user = await User.findOne({ 
				passwordResetToken: hashedToken, 
				passwordTokenExpires: { $gt: Date.now() }
			})
	
			if(!user){
				return next(res.status(400).json({ message: 'token is invalid or expired' }))
			}
	
			user.password = req.body.password
			user.passwordConfirm = req.body.passwordConfirm
			user.passwordResetToken = undefined
			user.passwordResetExpires = undefined
			await user.save()


			// sign token 
			const token = signToken(user._id) 
			res.status(200).json({
				status: 'success',
				token,
			})
		} catch (error) {
			next(res.status(500).json(error))
		}
	}
}

export default authController
