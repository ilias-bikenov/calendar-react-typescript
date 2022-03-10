import { IEvent } from '../../../models/IEvents';
import { IUser } from '../../../models/IUser';
import { Moment } from 'moment';
export interface EventState {
  guests: IUser[];
  events: IEvent[];
  date: Moment | undefined;
}

export enum EventActionsEnum {
  SET_GUESTS = 'SET_GUESTS',
  SET_EVENTS = 'SET_EVENTS',
  SET_DATE = 'SET_DATE',
}

export interface SetGuestsAction {
  type: EventActionsEnum.SET_GUESTS;
  payload: IUser[];
}

export interface SetEventsAction {
  type: EventActionsEnum.SET_EVENTS;
  payload: IEvent[];
}

export interface SetDateAction {
  type: EventActionsEnum.SET_DATE;
  payload: Moment | undefined;
}

export type EventAction = SetGuestsAction | SetEventsAction | SetDateAction;
