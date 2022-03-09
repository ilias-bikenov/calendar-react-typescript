import { AppDispatch } from '../..';
import { IEvent } from '../../../models/IEvents';
import { IUser } from '../../../models/IUser';
import UserService from '../../../api/UserService';
import { EventActionsEnum, SetEventsAction, SetGuestsAction } from './types';

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionsEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionsEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      //mocking data
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      //server imitating
      const unparsedEvents = localStorage.getItem('events') || '[]';
      const events = JSON.parse(unparsedEvents) as IEvent[];
      events.push(event);
      dispatch(EventActionCreators.setEvents(events));
      localStorage.setItem('events', JSON.stringify(events));
    } catch (e) {}
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      //mock server
      const unparsedEvents = localStorage.getItem('events') || '[]';

      const events = JSON.parse(unparsedEvents) as IEvent[];
      const currentUserEvents = events.filter(
        (event) => event.author === username || event.guest === username
      );
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
