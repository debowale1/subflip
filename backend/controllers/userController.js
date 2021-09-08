/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import User from '../models/userModel.js'

const userController = {
	getAllUser: async (_, res, next) => {
		try {
			const users = await User.find()
			res.status(200).json(users)
		} catch (error) {
			return next(error)
		}
	},
	// eslint-disable-next-line consistent-return
	createUser: async (req, res, next) => {
		try {
			const user = await User.create(req.body)
			res.status(201).json({
				status: 'success',
				result: {
					user,
				},
			})
		} catch (error) {
			return next(error)
		}
	},
}

export default userController
