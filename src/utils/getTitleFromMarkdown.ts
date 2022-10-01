const TITLE_REGEX = /[^a-z-A-Z0-9а-я-А-Я.,!?\- ]/g;

export const getTitleFromMarkdown = (markdown: string) => {
  const match = markdown.match(/# .+\n/);
  if (match) {
    return match[0].slice(1).trim().replaceAll(TITLE_REGEX, '');
  }
  return null;
};
