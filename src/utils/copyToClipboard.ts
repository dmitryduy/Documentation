import { showTooltip } from './showTooltip';

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
    .then(() => showTooltip('Скопировано'))
    .catch(() => showTooltip('Не удалось скопировать'));
};
