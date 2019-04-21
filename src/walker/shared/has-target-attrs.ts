import { targetAttrs } from './constant';
import { hasTargetAttr } from './has-target-attr';

export const hasTargetAttrs = (node: HTMLElement) =>
  targetAttrs.some(attr => hasTargetAttr(attr, node));
