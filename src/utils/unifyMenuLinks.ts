export const unifyMenuLinks = (link :string, removeWhiteSpace = true) => {
  const newLink = link.replaceAll(/[^a-zA-Z0-9 А-Яа-я]/g, '').trim();
  if (removeWhiteSpace) return newLink.trim().replaceAll(' ', '-');
  return newLink;
};