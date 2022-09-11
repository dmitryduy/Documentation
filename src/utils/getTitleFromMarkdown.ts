export const getTitleFromMarkdown = (markdown: string) => {
  const match = markdown.match(/# .+\n/);
  if (match) {
    return match[0].slice(1).trim();
  }
  return null;
};
