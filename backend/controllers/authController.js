/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const signToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '90d'
	})
}

const authController = {
	register: async (req, res, next) => {
		const { firstname, lastname, email, password, passwordConfirm } = req.body
		try {
      // check if user with the email already exists
			const user = await User.findOne({ email })

      if(user) return next(res.status(401).json({ status: 'fail', message: 'User already exists. Kindly log in instead'}))

      const newUser = await User.create({
				firstname,
				lastname,
				email,
				password,
				passwordConfirm
			})

      // generate a token for the user
      const token = signToken(newUser._id) 
			

			res.status(200).json({
				status: 'success',
				data: {
					newUser,
          token
				},
			})
		} catch (error) {
			return next(error)
		}
	},
	// eslint-disable-next-line consistent-return
	login: async (req, res, next) => {
		const { username, password } = req.body
		try {
			const user = await User.findOne({username}).select('+password')

      if(!user || !(await user.comparePassword(password, user.password))){
        return next(res.status(401).json({ status: 'fail', message: 'username or password is incorrect. Please try again'}))
      }
      // sign token 
			const token = signToken(user._id) 
      // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      //   expiresIn: '90d'
      // })
			res.status(200).json({
				status: 'success',
				data: {
					user,
          token
				},
			})
		} catch (error) {
			return next(error)
		}
	},
	resetPassword: async (req, res, next) => {
		const { email } = req.body
		try {
			// check if email is registered
			const user = await User.findOne({email})

			if(!user) return next(res.status(404).json({ status: 'fail', message: `User with the email does not exist. Please sign up /api/v1/auth/signup`}))

			// @TODO
			// sendResetPasswordEmail(email)

			res.status(200).json({
				status: 'success',
				message: 'We have sent a link to your email. Follow the link to reset your password'
			})
		} catch (error) {
			next(res.status(500).json(error))
		}
	}
}

export default authController
