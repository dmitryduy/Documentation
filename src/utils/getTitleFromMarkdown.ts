export const getTitleFromMarkdown = (markdown: string) => {
  const match = markdown.match(/# .+\n/);
  if (match) {
    return match[0].slice(1).trim().replaceAll(/[^a-z-A-Z0-9а-я-А-Я.,!?\- ]/g, '');
  }
  return null;
};
