
export const getFromClipboard = (success: (text: string) => void, onError: (error: string) => void) => {
  navigator.clipboard.readText()
    .then(success)
    .catch(() => onError('Не удалось взять скопированные данные'));
};