import express from 'express';
const router = express.Router()

import {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/users.js';

router.route('/').get(getAllUsers).post(addUser)
router.route('/:username').get(getUser).patch(updateUser).delete(deleteUser)

export default router