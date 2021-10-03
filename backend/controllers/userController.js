/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import User from '../models/userModel.js'

const userController = {
	getAllUser: async (_, res, next) => {
		try {
			const users = await User.find().sort({ createdAt: -1})

			res.status(200).json({
				status: 'success',
				result: users.length,
				data: {
					users,
				},
			})
		} catch (error) {
			return next(error)
		}
	},
	// eslint-disable-next-line consistent-return
	createUser: async (req, res, next) => {
		const { firstname, lastname, email, password, passwordConfirm } = req.body
		try {
			// check if email is already registered
			const user = await User.findOne({ email })
			if(user){
				return next(res.status(500).json({ status: 'Fail', message: 'User already exist. Please Login here'}))
			}
			const createdUser = await User.create({
				firstname,
				lastname,
				email,
				password,
				passwordConfirm
			})
			res.status(201).json({
				status: 'success',
				data: {
					user: createdUser,
				},
			})
		} catch (error) {
			return next(error)
		}
	},
	updateMe: async (req, res, next) => {
		// throw an error if user tries to update their password
		if(req.body.password || req.body.passwordConfirm){
			return next(res.status(400).json({message: 'You can\'t update password using this route. Please use /updatePassword'}))
		}

		// update their details
		// const updatedUser = await User.findByIdAndUpdate(req.body)

		res.status(200).json({
			status: 'success'
		})

	}
}

export default userController
