import { EmitterNames } from '../emitterNames';

export const showTooltip = (title: string) => {
  window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title});
};
