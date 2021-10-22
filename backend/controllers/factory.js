
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
  getOne: (Model, popOption) => async(req, res, next) => {
		const {id} = req.params
		try {
        let query = Model.findById(id)
        if(popOption) query  = query.populate(popOption)
				const doc = await query
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
  },
  createOne: Model => async (req, res, next) => {
    try {
      const doc = await Model.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          data: doc
        }
      })
    } catch (error) {
      // res.status(500).json(error)
      return next(error)
    }
  },
  getAll: Model => async (req, res, next) => {
		const queryObj = { ...req.query }
		
		const allowedFields = ['sort','limit', 'fields', 'page']
		allowedFields.forEach(el => delete queryObj[el]);
		
		try {

			let query = Model.find(queryObj)

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


			const docs = await query.explain()

			res.status(200).json({
				status: 'success',
				result: docs.length,
				data: {
					data: docs
				},
			})
		} catch (error) {
			return next(error)
		}
	}

}

export default factory