import { Router } from 'express'

const router = Router()

router.route('/', (req, res) => {
  res.send('helo')
})

export default router