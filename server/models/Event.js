import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'must provide author'],
  },
  date: {
    type: Date,
    required: [true, 'must provide date'],
  },
  description: {
    type: String,
    required: [true, 'must provide description'],
  },
  guest: {
    type: String,
  },
})

export default mongoose.model('Event', EventSchema)