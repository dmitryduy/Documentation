import { Emitter } from './utils/emitter';
import { EmitterNames } from './emitterNames';


export {};

declare global {
  interface Window {
    emitter: {
      on: <T extends object>(eventName: EmitterNames, cb: (data?: T) => void) => void,
      emit: <T extends object>(eventName: EmitterNames, data?: T) => void,
      un: (eventName: EmitterNames) => void
    }
  }
}

const windowExtends = () => {
  window.emitter = new Emitter();
};

export default windowExtends;