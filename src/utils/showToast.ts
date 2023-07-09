import { Errors } from '../errors';

import { Event, eventManager } from './emitter';

export const showToast = (value: any) => {
  if (typeof value === 'string') {
    eventManager.emit(Event.SHOW_TOAST, value);
  } else if (value instanceof Error) {
    eventManager.emit(Event.SHOW_TOAST, value.message);
  } else {
    eventManager.emit(Event.SHOW_TOAST, Errors.UNEXPECTED_ERROR);
    console.log(value);
  }
};