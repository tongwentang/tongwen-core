import { ParsedNode } from '../types';
import { extractAttrText } from './extract-attr-text';

export const parseNode = (node: HTMLElement | Document): ParsedNode[] => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return [{ type: 'TEXT', node: node as HTMLElement, text: node.nodeValue! }];
    case Node.ELEMENT_NODE:
      return extractAttrText(node as HTMLElement).map(([attr, text]) => ({
        type: 'ATTRIBUTE',
        node: node as HTMLElement,
        text,
        attr,
      }));
    case Node.DOCUMENT_NODE:
      return [{ type: 'DOCUMENT', node: node as Document, text: node.title }];
    default:
      return [];
  }
};
