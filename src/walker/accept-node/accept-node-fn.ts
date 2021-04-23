import { EDITABLE_NODE_NAMES, REJECT_NODE_NAMES, TARGET_NODE_ATTRIBUTES } from '../constant/constant';
import { TargetCharRegex } from '../constant/regex';
import { ParsedElementNode, ParsedTextNode } from '../model/parsed';

export type HasTargetContent = (text: string | null) => boolean;
export const hasTargetContent: HasTargetContent = text => {
  return TargetCharRegex.test(text!);
};

export type IsRejectNode = (node: Node) => boolean;
export const isRejectNode: IsRejectNode = node => {
  return REJECT_NODE_NAMES.indexOf(node.nodeName) !== -1;
};

export type IsEditableElement = (elm: Element) => boolean;
export const isEditableElement: IsEditableElement = elm => {
  return EDITABLE_NODE_NAMES.indexOf(elm.nodeName) !== -1 || elm.getAttribute('contenteditable') === 'true';
};

export type HasTargetAttributes = (elm: Element) => boolean;
export const hasTargetAttributes: HasTargetAttributes = elm => {
  return TARGET_NODE_ATTRIBUTES.some(attr => elm.hasAttribute(attr));
};

export type ParseTextNode = (node: Node) => ParsedTextNode;
export const parseTextNode: ParseTextNode = node => {
  return { type: 'TEXT', node, text: node.nodeValue! };
};

export type ParseElementNode = (elm: Element) => ParsedElementNode[];
export const parseElementNode: ParseElementNode = elm => {
  return TARGET_NODE_ATTRIBUTES.reduce<ParsedElementNode[]>((col, attr) => {
    hasTargetContent(elm.getAttribute(attr)!) &&
      col.push({ type: 'ELEMENT', node: elm, attr, text: elm.getAttribute(attr)! });
    return col;
  }, []);
};
