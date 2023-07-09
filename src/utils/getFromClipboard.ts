import { showToast } from './showToast';

export const getFromClipboard = (fn: (text: string) => void) => {
  navigator.clipboard.readText()
    .then(text => fn(text))
    .catch(() => showToast('Не удалось взять скопированные данные'));
};