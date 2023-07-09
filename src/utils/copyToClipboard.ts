import { showToast } from './showToast';

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
    .then(() => showToast('Скопировано'))
    .catch(() => showToast('Не удалось скопировать'));
};
