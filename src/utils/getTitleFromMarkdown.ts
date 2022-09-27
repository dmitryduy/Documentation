export const getTitleFromMarkdown = (markdown: string) => {
  const match = markdown.match(/<h1>.*<\/h1>/s);
  if (match) {
    return match[0].replaceAll(/<[^>]*>/g, '').trim();
  }
  return null;
};
