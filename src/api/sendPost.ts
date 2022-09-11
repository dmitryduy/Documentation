import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';
import { EmitterNames } from '../emitterNames';
import { BASE_URL } from '../global.constants';

export const sendPost = (markdown: string, tags: string[], title: string) => {
  fetch(`${BASE_URL}/create-post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      markdown,
      tags,
      menu: getMenuFromMarkdown(markdown),
      title
    })
  })
    .then(() => window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Пост добавлен'}))
    .catch(() =>
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Ошибка добавления поста. Попробуйте позже.'}));

};