/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const authController = {
	register: async (req, res, next) => {
		try {
      // check if user with the email already exists
			const user = await User.findOne({ email: req.body.email})

      if(user) return next(res.status(401).json({ status: 'fail', message: 'User already exists'}))

      const newUser = await User.create(req.body)

      // generate a token for the user
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: '90d'
      })

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
	// createUser: async (req, res, next) => {
	// 	console.log(req.body);
	// 	try {
	// 		const user = await User.create(req.body)
	// 		res.status(201).json({
	// 			status: 'success',
	// 			data: {
	// 				user,
	// 			},
	// 		})
	// 	} catch (error) {
	// 		return next(error)
	// 	}
	// },
}

export default authController
