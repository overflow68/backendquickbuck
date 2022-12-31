
const User = require('../models/user');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError('Provide credentials');
  }

  try {
    const user = await User.create(req.body);
  const token = await user.createJWT();

  res.status(200).json({ "username":user.username,"email":user.email, token });
  } catch (error) {
    throw new BadRequestError('Invalid credentials!')
  }
  
};

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password){
    throw new BadRequestError('Provide credentials');
  }
  const user =  await User.findOne({ email: email })
  if (!user){
    throw new UnauthenticatedError("User does not exist!")
  }
  const comparePasswords = await user.comparePassword(password)
  if (!comparePasswords){
    throw new UnauthenticatedError("Wrong password!")
  }
  const token = await user.createJWT()
  res.status(200).json({"username":user.username,"email":user.email, token})
};
module.exports = { register, login };
