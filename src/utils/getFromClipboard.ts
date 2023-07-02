import { showTooltip } from './showTooltip';

export const getFromClipboard = (fn: (text: string) => void) => {
  navigator.clipboard.readText()
    .then(text => fn(text))
    .catch(() => showTooltip('Не удалось взять скопированные данные'));
};