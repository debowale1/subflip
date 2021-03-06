/* eslint-disable import/extensions */
import User from '../models/userModel.js'
import factory from './factory.js'

const filterObj = (reqBody, ...allowedFields) => {
	const updateFields = {}
	for(const key in reqBody){
		if(allowedFields.includes(key)){
			updateFields[key] = reqBody[key]
		}
	}
	return updateFields
}


const userController = {
	getAllUser: factory.getAll(User),
	getUserById: factory.getOne(User),
	deleteUserById: factory.deleteOne(User),
	updateUser: factory.updateOne(User),
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
		
		const filteredBody = filterObj(req.body, 'firstname', 'lastname', 'email', 'username', 'phoneNumber', 'facebookUrl', 'twitterUrl')


		// update their details
		const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: 'success',
			data: {
				user: updatedUser
			}
		})

	},
	deleteMe: async (req, res, next) => {
		
		try {
			await User.findByIdAndUpdate(req.user.id, { active: false })	
			res.status(204).json({
				status: 'success',
				data: {
					user: null
				}
			})
		} catch (error) {
			return next(error)
		}
	},
	myDetails: async (req, res, next) => {
		req.params.id = req.user.id
		next()
	} 
		// throw an error if user tries to update their password
		
}

export default userController
