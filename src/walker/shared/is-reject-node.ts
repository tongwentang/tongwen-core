import { REJECT_NODE_NAMES } from '../constant/constant';

export const isRejectNode = (node: Node) => REJECT_NODE_NAMES.includes(node.nodeName);
