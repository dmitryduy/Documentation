import { EmitterNames } from '../emitterNames';

export class Emitter {
  listeners = {} as { [key in EmitterNames]: ((data: any) => void)[] };

  on<T extends object>(eventName: EmitterNames, cb: (data?: T) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(cb);
  }

  emit<T extends object>(eventName: EmitterNames, data?: T) {
    if (this.listeners[eventName]) {
      for (const cb of this.listeners[eventName]) {
        cb(data);
      }
    }
  }

  un(eventName: EmitterNames) {
    this.listeners[eventName] = [];
  }
}