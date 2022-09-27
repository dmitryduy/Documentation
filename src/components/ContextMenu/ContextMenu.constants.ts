import { IContextMenuAction } from './ContextMenu.typings';

export const contextMenuActions: IContextMenuAction = {
  'heading-1': {
    template: '<h1>Заголовок</h1>',
    insert: str => `<h1>${str}</h1>`,
    startSelection: 4,
    endSelection: 13
  },
  'heading-2': {
    template: '<h2 id="тут нужен id">Заголовок</h2>',
    insert: str => `<h2 id="тут нужен id">${str}</h2>`,
    startSelection: 22,
    endSelection: 31
  },
  'heading-3': {
    template: '<h3 id="тут нужен id">Заголовок</h3>',
    insert: str => `<h3 id="тут нужен id">${str}</h3>`,
    startSelection: 22,
    endSelection: 31
  },
  'paragraph': {
    template: '<p>Текст</p>',
    insert: str => `<p>${str}</p>`,
    startSelection: 3,
    endSelection: 8
  },
  'strong': {
    template: '<strong>текст</strong>',
    insert: str => `<strong>${str}</strong>`,
    startSelection: 8,
    endSelection: 13
  },
  'italic': {
    template: '<i>текст</i>',
    insert: str => `<i>${str}</i>`,
    startSelection: 3,
    endSelection: 8
  },
  'delete': {
    template: '<del>текст</del>',
    insert: str => `<del>${str}</del>`,
    startSelection: 5,
    endSelection: 10
  },
  'marker': {
    template: '<pre>маркер</pre>',
    insert: str => `<pre>${str}</pre>`,
    startSelection: 5,
    endSelection: 11
  },
  'link': {
    template: '<a href="ссылка">имя ссылки</a>',
    insert: str => `<a href="${str}">имя ссылки</a>`,
    startSelection: 9,
    endSelection: 15
  },
  'info': {
    template: '<div type="info">\nКонтент\n</div>',
    insert: str => `<div type="info">\n    ${str}\n</div>`,
    startSelection: 18,
    endSelection: 25,
  },
  'alert': {
    template: '<div type="alert">\nКонтент\n</div>',
    insert: str => `<div type="alert">\n    ${str}\n</div>`,
    startSelection: 19,
    endSelection: 26,
  },
  'tip': {
    template: '<div type="tip">\nКонтент\n</div>',
    insert: str => `<div type="tip">\n    ${str}\n</div>`,
    startSelection: 17,
    endSelection: 24,
  },
  'caution': {
    template: '<div type="caution">\nКонтент\n</div>',
    insert: str => `<div type="caution">\n    ${str}\n</div>`,
    startSelection: 21,
    endSelection: 28,
  },
  'code': {
    template: '<code type=js>код</code>',
    insert: str => `<code type=js>${str}</code>`,
    startSelection: 11,
    endSelection: 13
  },
  'unordered-list': {
    template: '<ul>\n   <li>Первый элемент</li>\n   <li>Второй элемент</li>\n</ul>',
    insert: str => `<ul>\n   <li>${str}</li>\n</ul>`,
    startSelection: 12,
    endSelection: 26
  },
  'ordered-list': {
    template: '<ol>\n   <li>Первый элемент</li>\n   <li>Второй элемент</li>\n</ol>',
    insert: str => `<ol>\n   <li>${str}</li>\n</ol>`,
    startSelection: 12,
    endSelection: 26
  },
  'image': {
    template: '<img src="ссылка"/>',
    insert: str => `<img src="${str}"/>`,
    startSelection: 10,
    endSelection: 16
  },
  'video': {
    template: '<div type="video">ссылка</div>',
    insert: str => `<div type="video">${str}</div>`,
    startSelection: 18,
    endSelection: 24
  },
  'table': {
    template: `<table>
  <tr>
    <th>Первый заголовок</th>
    <th>Второй заголовок</th>
  </tr>
  <tr>
    <td>Первая строчка, первый столбец</td>
    <td>Первая строчка, второй столбец</td>
    <td>Первая строчка, третий столбец</td>
  </tr>
  <tr>
    <td>Вторая строчка, первый столбец</td>
    <td>Вторая строчка, второй столбец</td>
    <td>Вторая строчка, третий столбец</td>
  </tr>
</table>`,
    insert: str => str,
    startSelection: 0,
    endSelection: 0
  },
};
