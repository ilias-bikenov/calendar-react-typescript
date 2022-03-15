import express from 'express';
const router = express.Router()

import {
  getAllEvents,
  addEvent,
  getEvent,
  deleteEvent,
  updateEvent,
} from '../controllers/events.js';

router.route('/').get(getAllEvents).post(addEvent)
router.route('/:eventId').get(getEvent).patch(updateEvent).delete(deleteEvent)

export default router