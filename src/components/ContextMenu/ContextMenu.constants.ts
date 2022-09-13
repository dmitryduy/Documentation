import { IContextMenuAction } from './ContextMenu.typings';

export const contextMenuActions: IContextMenuAction = {
  'heading-1': {
    template: '# Заголовок',
    insert: str => `# ${str}`,
    startSelection: 2,
    endSelection: 11
  },
  'heading-2': {
    template: '## Заголовок',
    insert: str => `## ${str}`,
    startSelection: 3,
    endSelection: 12
  },
  'heading-3': {
    template: '### Заголовок',
    insert: str => `### ${str}`,
    startSelection: 4,
    endSelection: 13
  },
  'strong': {
    template: '**текст**',
    insert: str => `**${str}**`,
    startSelection: 2,
    endSelection: 7
  },
  'italic': {
    template: '*текст*',
    insert: str => `*${str}*`,
    startSelection: 1,
    endSelection: 6
  },
  'marker': {
    template: '`маркер`',
    insert: str => `\`${str}\``,
    startSelection: 1,
    endSelection: 7
  },
  'link': {
    template: '[имя ссылки](адрес-ссылки)',
    insert: str => `[${str}](адрес-ссылки)`,
    startSelection: 1,
    endSelection: 11
  },
  'info': {
    template: `:::info
info[заголовок]
содержимое
:::`,
    insert: str => `:::info
info[заголовок]
${str}
:::`,
    startSelection: 13,
    endSelection: 22,
    multiselect: true
  },
  'alert': {
    template: `:::alert
alert[заголовок]
содержимое
:::`,
    insert: str => `:::alert
alert[заголовок]
${str}
:::`,
    startSelection: 15,
    endSelection: 24,
    multiselect: true
  },
  'tip': {
    template: `:::tip
tip[заголовок]
содержимое
:::`,
    insert: str => `:::tip
tip[заголовок]
${str}
:::`,
    startSelection: 11,
    endSelection: 20,
    multiselect: true
  },
  'code': {
    template: `\`\`\`js
код
\`\`\``,
    insert: str => `\`\`\`js
${str}
\`\`\``,
    startSelection: 6,
    endSelection: 9
  },
  'unordered-list': {
    template: `
- элемент\n- элемент\n- элемент`,
    insert: str => `- ${str}`,
    startSelection: 4,
    endSelection: 10
  },
};
