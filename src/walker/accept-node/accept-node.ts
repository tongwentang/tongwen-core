import { ParsedResult } from '../model/parsed.js';
import type {
  HasTargetAttributes,
  IsEditableElement,
  IsRejectNode,
  IsTargetTextNode,
  ParseElementNode,
  ParseTextNode,
} from './accept-node-fn.js';
import {
  hasTargetAttributes,
  isEditableElement,
  isRejectNode,
  isTargetTextNode,
  parseElementNode,
  parseTextNode,
} from './accept-node-fn.js';

export interface AcceptNodeConfig {
  isTargetTextNode: IsTargetTextNode;
  isRejectNode: IsRejectNode;
  isEditableElement: IsEditableElement;
  hasTargetAttributes: HasTargetAttributes;
  parseTextNode: ParseTextNode;
  parseElementNode: ParseElementNode;
}

/**
 * @deprecated Will removed at next major version v6.0.0, use {@link AcceptNodeConfig} instead.
 */
export type AcceptNodeFn = AcceptNodeConfig;

export const acceptNodeConfig: AcceptNodeConfig = {
  isTargetTextNode,
  isRejectNode,
  isEditableElement,
  hasTargetAttributes,
  parseTextNode,
  parseElementNode,
};

export const acceptNodeWith =
  (parseds: ParsedResult[], config: AcceptNodeConfig) =>
  (node: Node): number => {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        return config.isTargetTextNode(node)
          ? (parseds.push(config.parseTextNode(node)), NodeFilter.FILTER_ACCEPT)
          : NodeFilter.FILTER_SKIP;
      case Node.ELEMENT_NODE:
        return config.isRejectNode(node)
          ? NodeFilter.FILTER_REJECT
          : config.isEditableElement(node as HTMLElement)
            ? (parseds.push(...config.parseElementNode(node as HTMLElement)), NodeFilter.FILTER_REJECT)
            : config.hasTargetAttributes(node as HTMLElement)
              ? (parseds.push(...config.parseElementNode(node as HTMLElement)), NodeFilter.FILTER_ACCEPT)
              : NodeFilter.FILTER_SKIP;
      default:
        return NodeFilter.FILTER_SKIP;
    }
  };
