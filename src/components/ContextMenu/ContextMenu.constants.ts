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
  'delete': {
    template: '~текст~',
    insert: str => `~${str}~`,
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
    template: `
:::info
info[заголовок]
содержимое
:::`,
    insert: str => `
:::info
info[заголовок]
${str}
:::`,
    startSelection: 14,
    endSelection: 23,
    multiselect: true
  },
  'alert': {
    template: `
:::alert
alert[заголовок]
содержимое
:::`,
    insert: str => `
:::alert
alert[заголовок]
${str}
:::`,
    startSelection: 16,
    endSelection: 25,
    multiselect: true
  },
  'tip': {
    template: `
:::tip
tip[заголовок]
содержимое
:::`,
    insert: str => `
:::tip
tip[заголовок]
${str}
:::`,
    startSelection: 12,
    endSelection: 21,
    multiselect: true
  },
  'caution': {
    template: `
:::caution
caution[заголовок]
содержимое
:::`,
    insert: str => `
:::caution
caution[заголовок]
${str}
:::`,
    startSelection: 20,
    endSelection: 29,
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
  'ordered-list': {
    template: `
-1. элемент\n2. элемент\n3. элемент`,
    insert: str => `1. ${str}`,
    startSelection: 5,
    endSelection: 12
  },
  'image': {
    template: '![текст](ссылка)',
    insert: str => `![текст](${str})`,
    startSelection: 2,
    endSelection: 7,
    multiselect: true
  },
  'video': {
    template: '![видео](ссылка)',
    insert: str => `![видео](${str})`,
    startSelection: 9,
    endSelection: 15
  },
  'table': {
    template: `| заголовок | второй заголовок |
| - | - | 
| текст | текст |`,
    insert: str => str,
    startSelection: 2,
    endSelection: 11
  },
};
