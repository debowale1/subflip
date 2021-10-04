/* eslint-disable import/extensions */
// import { promisify } from 'util'
import jwt from "jsonwebtoken"
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }else if(req.cookies.jwt){
    token = req.cookies.jwt;
  }

  // decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // get user belonging to that token
  const user = await User.findById(decoded.id);

  if(!user) return next(res.status(401).json({ status: 'error', message: 'user belonging to this token no longer exist'}))

  // everything OK
  req.user = user
  next();

}

const grantAccessTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(res.status(403).json({message: 'this user is not authorized to perform thhis action'}))
    }
    next()
  }
}

export { protect, grantAccessTo }