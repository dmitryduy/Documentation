export const getMenuFromMarkdown = (markdown: string) => {
  const regex = /<h(2)\s*id\s*=\s*"(.*)">.*<\/h2>|<h(3)\s*id\s*=\s*"(.*)">.*<\/h3>/sg;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log(markdown, markdown.matchAll(regex));
  return [...markdown.matchAll(regex)].reduce((prev, curr) => {
    const heading = curr[1] || curr[3];
    const id = `${curr[2] || curr[4]}`.replaceAll(/<[^>]*>/sg, '').replaceAll(/\s/sg, '-').trim();
    const last = prev[prev.length - 1];

    if (heading === '3' && !Array.isArray(last)) {
      return [...prev, [id]];
    }
    if (heading === '3' && Array.isArray(last)) {
      last.push(id);
      return prev;
    }
    if (heading === '2') {
      return [...prev, id];
    }
    return prev;

  }, []as (string | string[])[]);
};
