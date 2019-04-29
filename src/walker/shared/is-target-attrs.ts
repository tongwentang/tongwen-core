import { targetAttrs } from './constant';
import { isTargetAttr } from './is-target-attr';

export const isTargetAttrs = (node: HTMLElement) =>
  targetAttrs.some(attr => isTargetAttr(attr, node));
