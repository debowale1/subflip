/* eslint-disable import/extensions */
import User from '../models/userModel.js'

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
	getAllUser: async (req, res, next) => {
		const queryObj = { ...req.query }
		
		const allowedFields = ['sort','limit', 'fields', 'page']
		allowedFields.forEach(el => delete queryObj[el]);
		
		try {

			let query = User.find(queryObj)

			if(req.query.sort){
				const sortBy = req.query.sort.split(',').join(' ')
				query = query.sort(sortBy)
			}else{
				query = query.sort('createdAt')
			}

			// fields selection
			if(req.query.fields){
				const fields = req.query.fields.split(',').join(' ')
				query = query.select(fields)
			}else{
				query = query.select('-__v')
			}

			// pagination
			const perPage = +req.query.limit || 15
			const page = +req.query.page || 1
			const skip = (page - 1) * perPage
			query = query.skip(skip).limit(perPage)


			const users = await query

			res.status(200).json({
				status: 'success',
				result: users.length,
				data: {
					users
				},
			})
		} catch (error) {
			return next(error)
		}
	},
	getUserById: async(req, res, next) => {
		const {id} = req.params
		try {
				const user = await User.findById(id)
				if(!user) return next(res.status(404).json({ message: 'User not found'}))

				res.status(200).json({
					status: 'success',
					data: {
						user
					}
				})
		} catch (error) {
			return next(error)
		}
	},
	deleteUserById: async(req, res, next) => {
		const {id} = req.params
		try {
				await User.findByIdAndDelete(id)
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
	}
		// throw an error if user tries to update their password
		
}

export default userController
