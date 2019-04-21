import { hasChinese } from './has-chinese';

export const hasTargetAttr = (attr: string, node: HTMLElement) =>
  node.hasAttribute(attr) && hasChinese(node.getAttribute(attr)!);
