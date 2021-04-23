import { targetAttrs } from './constant';
import { isTargetAttr } from './is-target-attr';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export const isTargetAttrs = (node: HTMLElement) => targetAttrs.some(attr => isTargetAttr(attr, node));
