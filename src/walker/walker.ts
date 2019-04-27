import { acceptNode } from './shared/accept-node';
import { filterNodeType } from './shared/constant';
import { parseNode } from './shared/parse-node';
import { ParsedNode } from './types';

export type Walker = (dom: Node) => ParsedNode[];

export const walker: Walker = dom => {
  const parsedNodes: ParsedNode[] = [];
  const tw = document.createTreeWalker(dom, filterNodeType(), { acceptNode });

  while (tw.nextNode()) {
    parsedNodes.push(...parseNode(tw.currentNode as HTMLElement));
  }

  return parsedNodes;
};
