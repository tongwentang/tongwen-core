import { acceptNode } from './shared/accept-node';
import { filterNodeType } from './shared/constant';
import { extractAttrText } from './shared/extract-attr-text';
import { hasChinese } from './shared/has-chinese';
import { ParsedNode } from './shared/types';

export type Walker = (dom: Node) => ParsedNode[];

export const walker: Walker = dom => {
  const parsedNodes: ParsedNode[] = [];
  const tw = document.createTreeWalker(dom, filterNodeType(), { acceptNode });

  if (dom === document && hasChinese((dom as Document).title)) {
    parsedNodes.push({ type: 'DOCUMENT', node: dom as Document, text: (dom as Document).title });
  }

  while (tw.nextNode()) {
    const node = tw.currentNode as HTMLElement;

    switch (node.nodeType) {
      case Node.TEXT_NODE:
        parsedNodes.push({ type: 'TEXT', node, text: node.nodeValue! });
        break;
      case Node.ELEMENT_NODE:
        extractAttrText(node).forEach(([attr, text]) =>
          parsedNodes.push({ type: 'ATTRIBUTE', node, text, attr }),
        );
        break;
      default:
        break;
    }
  }

  return parsedNodes;
};
