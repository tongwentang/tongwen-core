import { EDITABLE_NODE_NAMES, REJECT_NODE_NAMES, TARGET_NODE_ATTRIBUTES } from '../constant/constant.js';
import { TargetCharRegex } from '../constant/regex.js';
import type { ParsedElementNode, ParsedTextNode } from '../model/parsed.js';

export type HasTargetContent = (text: string | null) => boolean;
export const hasTargetContent: HasTargetContent = text => {
  return TargetCharRegex.test(text!);
};

export type IsTargetTextNode = (node: Node) => boolean;
export const isTargetTextNode: IsTargetTextNode = node => {
  return !node.parentElement?.isContentEditable && TargetCharRegex.test(node.nodeValue!);
};

export type IsRejectNode = (node: Node) => boolean;
export const isRejectNode: IsRejectNode = node => {
  return REJECT_NODE_NAMES.indexOf(node.nodeName) !== -1;
};

export type IsEditableElement = (elm: HTMLElement) => boolean;
export const isEditableElement: IsEditableElement = elm => {
  return EDITABLE_NODE_NAMES.indexOf(elm.nodeName) !== -1 || elm.isContentEditable;
};

export type HasTargetAttributes = (elm: HTMLElement) => boolean;
export const hasTargetAttributes: HasTargetAttributes = elm => {
  return TARGET_NODE_ATTRIBUTES.some(attr => elm.hasAttribute(attr));
};

export type ParseTextNode = (node: Node) => ParsedTextNode;
export const parseTextNode: ParseTextNode = node => {
  return { type: 'TEXT', node, text: node.nodeValue! };
};

export type ParseElementNode = (elm: HTMLElement) => ParsedElementNode[];
export const parseElementNode: ParseElementNode = elm => {
  return TARGET_NODE_ATTRIBUTES.reduce<ParsedElementNode[]>((col, attr) => {
    hasTargetContent(elm.getAttribute(attr)!) &&
      col.push({ type: 'ELEMENT', node: elm, attr, text: elm.getAttribute(attr)! });
    return col;
  }, []);
};
