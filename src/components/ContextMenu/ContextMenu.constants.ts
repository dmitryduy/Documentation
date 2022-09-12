import { IContextMenuAction } from './ContextMenu.typings';

export const contextMenuActions: IContextMenuAction = {
  'heading-1': {
    template: '# Заголовок ',
    insert: str => `# ${str} `
  },
  'heading-2': {
    template: '## Заголовок',
    insert: str => `## ${str}`
  },
  'heading-3': {
    template: '### Заголовок',
    insert: str => `### ${str}`
  },
  'strong': {
    template: '**текст**',
    insert: str => `**${str}**`
  },
  'italic': {
    template: '*текст*',
    insert: str => `*${str}*`
  },
  'marker': {
    template: '`маркер`',
    insert: str => `\`${str}\``
  },
  'link': {
    template: '[имя ссылки](адресс-ссылки)',
    insert: str => `[${str}](адрес-ссылки)`
  },
  'info': {
    template: `:::info
info[заголовок]
содержимое
:::`,
    insert: str => `:::info
info[заголовок]
${str}
:::`
  },
  'alert': {
    template: `:::alert
alert[заголовок]
содержимое
:::`,
    insert: str => `:::alert
alert[заголовок]
${str}
:::`
  },
  'tip': {
    template: `:::tip
tip[заголовок]
содержимое
:::`,
    insert: str => `:::tip
tip[заголовок]
${str}
:::`
  },
  'code': {
    template: `\`\`\`js
Код
\`\`\``,
    insert: str => `\`\`\`js
${str}
\`\`\``
  },
  'unordered-list': {
    template: '- элемент\n- элемент\n- элемент',
    insert: str => `- ${str}`
  },
};
