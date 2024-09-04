import { acceptNode } from './shared/accept-node.js';
import { filterNodeType } from './shared/constant.js';
import { isRejectNode } from './shared/is-reject-node.js';
import { parseNode } from './shared/parse-node.js';
import type { ParsedNode } from './types.js';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export type Walker = (dom: Node) => ParsedNode[];

/**
 * @deprecated will remove on next major version v5.0.0, use walkNode instead
 */
export const walker: Walker = node => {
  const parsedNodes: ParsedNode[] = [];
  const tw = document.createTreeWalker(node, filterNodeType(), { acceptNode });

  if (isRejectNode(tw.root)) {
    return parsedNodes;
  } else {
    do {
      parsedNodes.push(...parseNode(tw.currentNode as HTMLElement));
    } while (tw.nextNode());

    return parsedNodes;
  }
};
