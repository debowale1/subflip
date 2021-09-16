/* eslint-disable import/extensions */
import { promisify } from 'util'
import jwt from "jsonwebtoken"
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    // eslint-disable-next-line prefer-destructuring
    token = req.header.authorization.split(' ')[1]
  }else if(req.cookies.jwt){
    token = req.cookies.jwt
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.id)

  if(!user) return next(res.status(401).json({ status: 'fail', message: 'The user belonging this token no longer exist'}))

  // everything good
  req.user = user

}

const grantAccessTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(res.status(403).json({message: 'this user is not authorized to do this'}))
    }
    next()
  }
}

export { protect, grantAccessTo }