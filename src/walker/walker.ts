import { acceptNode } from './shared/accept-node';
import { filterNodeType } from './shared/constant';
import { isRejectNode } from './shared/is-reject-node';
import { parseNode } from './shared/parse-node';
import { ParsedNode } from './types';

export type Walker = (dom: Node) => ParsedNode[];

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
