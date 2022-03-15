import { createCustomError } from '../errors/custom-error.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
};

export const addUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 5);
  try {
    const user = await User.create({ username: req.body.username, password: hashedPassword })
    res.status(201).json({ user })

  } catch (e) {
    console.log(e);
    if (e.errors) {
      res.status(400).send(e.errors[Object.keys(e.errors)[0]].message)
    }
    res.status(400).send(e)
  }
};

export const getUser = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return next(createCustomError(`No user with username : ${username}`, 404))
  }

  res.status(200).json({ user })
}

export const deleteUser = async (req, res, next) => {
  const { username } = req.params
  const user = await User.findOneAndDelete({ username })
  if (!user) {
    return next(createCustomError(`No User with username : ${username}`, 404))
  }
  res.status(200).json({ user })
};

export const updateUser = async (req, res, next) => {
  const { username } = req.params

  const user = await User.findOneAndUpdate({ username }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(createCustomError(`No user with username : ${username}`, 404))
  }

  res.status(200).json({ user })
}
