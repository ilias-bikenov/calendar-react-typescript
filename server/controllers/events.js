import { createCustomError } from '../errors/custom-error.js';
import Event from '../models/Event.js';

export const getAllEvents = async (req, res) => {
  const events = await Event.find({})
  res.status(200).json({ events })
};

export const addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json({ event })

  } catch (e) {
    console.log(e);
    if (e.errors) {
      res.status(400).send(e.errors[Object.keys(e.errors)[0]].message)
    }
    res.status(400).send(e)
  }
};

export const getEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const event = await Event.findOne({ eventId });
  if (!event) {
    return next(createCustomError(`No event with id : ${eventId}`, 404))
  }

  res.status(200).json({ event })
}

export const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params
  const event = await Event.findOneAndDelete({ eventId })
  if (!event) {
    return next(createCustomError(`No Event with id : ${eventId}`, 404))
  }
  res.status(200).json({ event })
};

export const updateEvent = async (req, res, next) => {
  const { eventId } = req.params

  const event = await Event.findOneAndUpdate({ eventId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!event) {
    return next(createCustomError(`No event with id : ${eventId}`, 404))
  }

  res.status(200).json({ event })
}
