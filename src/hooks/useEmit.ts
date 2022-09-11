import { useEffect } from 'react';

import { EmitterNames } from '../emitterNames';

export const useEmit = <T>(emitName: EmitterNames, cb: (data: T) => void) => {

  useEffect(() => {
    window.emitter.on(emitName, data => {
      cb(data as T);
    });

    return () => window.emitter.un(emitName);
  }, []);
};
