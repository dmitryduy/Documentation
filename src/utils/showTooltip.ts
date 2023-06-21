import { EmitterNames } from '../emitterNames';

export const showTooltip = (title: string | Error) => {

  window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title});
};
