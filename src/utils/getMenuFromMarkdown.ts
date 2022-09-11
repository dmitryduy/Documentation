export const getMenuFromMarkdown = (markdown: string) => {
  const beautify = (str: string) => str.replaceAll('#', '').trim();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...markdown.matchAll(/##.+\s/g)].reduce((prev, curr) => {
    const match = curr[0];

    if (match.startsWith('###')) {
      const last = prev[prev.length - 1];
      if (typeof last === 'string') {
        return [...prev, [beautify(match)]];
      }
      last.push(beautify(match));
      return prev;
    }
    if (match.startsWith('##')) {
      return [...prev, beautify(match)];
    }
  }, [] as (string | string[])[]);
};
