import { ParsedResult } from '../model/parsed';
import type {
  HasTargetAttributes,
  HasTargetContent,
  IsEditableElement,
  IsRejectNode,
  ParseElementNode,
  ParseTextNode,
} from './accept-node-fn';
import {
  hasTargetAttributes,
  hasTargetContent,
  isEditableElement,
  isRejectNode,
  parseElementNode,
  parseTextNode,
} from './accept-node-fn';

export interface AcceptNodeFn {
  hasTargetContent: HasTargetContent;
  isRejectNode: IsRejectNode;
  isEditableElement: IsEditableElement;
  hasTargetAttributes: HasTargetAttributes;
  parseTextNode: ParseTextNode;
  parseElementNode: ParseElementNode;
}

const acceptNodefn: AcceptNodeFn = {
  hasTargetContent,
  isRejectNode,
  isEditableElement,
  hasTargetAttributes,
  parseTextNode,
  parseElementNode,
};

export const acceptNodeWith = (parseds: ParsedResult[], anf: Partial<AcceptNodeFn>) => (node: Node): number => {
  const fn = { ...acceptNodefn, ...anf };

  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return fn.hasTargetContent(node.nodeValue)
        ? (parseds.push(fn.parseTextNode(node)), NodeFilter.FILTER_ACCEPT)
        : NodeFilter.FILTER_SKIP;
    case Node.ELEMENT_NODE:
      return fn.isRejectNode(node)
        ? NodeFilter.FILTER_REJECT
        : fn.isEditableElement(node as HTMLElement)
        ? (parseds.push(...fn.parseElementNode(node as HTMLElement)), NodeFilter.FILTER_REJECT)
        : fn.hasTargetAttributes(node as HTMLElement)
        ? (parseds.push(...fn.parseElementNode(node as HTMLElement)), NodeFilter.FILTER_ACCEPT)
        : NodeFilter.FILTER_SKIP;
    default:
      return NodeFilter.FILTER_SKIP;
  }
};
