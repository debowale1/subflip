import User from '../models/userModel'

const userController = {
	getUser: async (req, res) => {
		const user = User.find()
		res.send(user)
	},
}

export default userController
