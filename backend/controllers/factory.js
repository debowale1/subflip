
const factory = {
  deleteOne: Model => async(req, res, next) => {
    const {id} = req.params
    try {
        const doc = await Model.findByIdAndDelete(id)
        if(!doc){
          return next(res.status(404).json({ status: 'fail', message: 'No document with the id' }))
        }
        res.status(204).json({
          status: 'success',
          data: null
        })
    } catch (error) {
      return next(error)
    }
  },
  getOne: Model => async(req, res, next) => {
		const {id} = req.params
		try {
				const doc = await Model.findById(id)
				if(!doc) return next(res.status(404).json({ message: 'Document not found'}))

				res.status(200).json({
					status: 'success',
					data: {
						data: doc
					}
				})
		} catch (error) {
			return next(error)
		}
	},
  updateOne: Model => async(req, res, next) => {
    const {id} = req.params
    try {
      const doc = Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      })
      if(!doc){
        return next(res.status(404).json({ message: 'Document not found'}))
      }
      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      })
    } catch (error) {
      return next(error)
      
    }
  }
}

export default factory