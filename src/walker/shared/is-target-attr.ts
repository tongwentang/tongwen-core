import { hasChinese } from './has-chinese.js';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export const isTargetAttr = (attr: string, node: HTMLElement) =>
  node.hasAttribute(attr) && hasChinese(node.getAttribute(attr)!);
