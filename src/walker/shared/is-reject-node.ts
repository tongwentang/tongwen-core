import { REJECT_NODE_NAMES } from '../constant/constant';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export const isRejectNode = (node: Node) => REJECT_NODE_NAMES.includes(node.nodeName);
