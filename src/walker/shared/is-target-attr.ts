import { hasChinese } from './has-chinese';

export const isTargetAttr = (attr: string, node: HTMLElement) =>
  node.hasAttribute(attr) && hasChinese(node.getAttribute(attr)!);
