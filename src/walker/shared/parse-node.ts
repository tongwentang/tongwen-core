import { ParsedNode } from '../types';
import { extractAttrText } from './extract-attr-text';

export const parseNode = (node: HTMLElement): ParsedNode[] => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return [{ type: 'TEXT', node: node, text: node.nodeValue! }];
    case Node.ELEMENT_NODE:
      return extractAttrText(node).map(([attr, text]) => ({
        type: 'ATTRIBUTE',
        node: node,
        text,
        attr,
      }));
    default:
      return [];
  }
};
