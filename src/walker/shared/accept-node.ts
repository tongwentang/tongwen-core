import { hasChinese } from './has-chinese';
import { hasTargetAttrs } from './has-target-attrs';

export const acceptNode = (node: HTMLElement) => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return hasChinese(node.nodeValue!) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    case Node.ELEMENT_NODE:
      return hasTargetAttrs(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    default:
      return NodeFilter.FILTER_SKIP;
  }
};
