import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide username'],
    trim: true,
    unique: true,
    maxlength: [20, 'username can not be more than 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'must provide username'],
    minlength: [4, 'password can not be less than 4 characters'],
  },
})

export default mongoose.model('User', UserSchema)