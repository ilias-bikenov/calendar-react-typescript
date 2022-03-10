import { EventAction, EventActionsEnum, EventState } from './types';

const initialState: EventState = {
  events: [],
  guests: [],
  date: undefined,
};

export default function eventReducer(
  state = initialState,
  action: EventAction
): EventState {
  switch (action.type) {
    case EventActionsEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
    case EventActionsEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionsEnum.SET_DATE:
      return { ...state, date: action.payload };
    default:
      return state;
  }
}
