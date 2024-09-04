import { hasChinese } from './has-chinese';
import { isRejectNode } from './is-reject-node';
import { isTargetAttrs } from './is-target-attrs';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export const acceptNode = (node: HTMLElement) => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return hasChinese(node.nodeValue!) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    case Node.ELEMENT_NODE:
      return isRejectNode(node)
        ? NodeFilter.FILTER_REJECT
        : isTargetAttrs(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
    default:
      return NodeFilter.FILTER_SKIP;
  }
};
