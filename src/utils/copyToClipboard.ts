export const copyToClipboard = (value: string, onSuccess: (text: string) => void, onError: (text: string) => void) => {
  navigator.clipboard.writeText(value)
    .then(() => onSuccess('Скопировано'))
    .catch(() => onError('Не удалось скопировать'));
};
