import { targetAttrs } from './constant.js';
import { hasChinese } from './has-chinese.js';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export const extractAttrText = (node: HTMLElement) =>
  targetAttrs.reduce(
    (parsedNodes, attr) => {
      hasChinese(node.getAttribute(attr)!) && parsedNodes.push([attr, node.getAttribute(attr)!]);
      return parsedNodes;
    },
    [] as [string, string][],
  );
