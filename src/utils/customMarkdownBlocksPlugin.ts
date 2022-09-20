import { visit } from 'unist-util-visit';

export const customMarkdownBlocksPlugin  = () => {
  return (tree: any) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'div') {
        const firstChild = node.children[0];

        if (firstChild && firstChild.tagName === 'p') {
          const match = firstChild.children[0].value.match(/^(alert|tip|info|caution)\[(.*)\]/);
          firstChild.children[0].value = firstChild.children[0].value.slice(match[0].length);

          if (match) {
            node.properties.className = match[1];
            node.properties.title = match[2];
          }

        }
      }
    });
  };
};
