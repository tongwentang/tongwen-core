import { AcceptNodeFn, acceptNodeWith } from './accept-node/accept-node';
import { TARGET_NODE_TYPE } from './constant/constant';
import { ParsedResult } from './model/parsed';

export const walkNode = (node: Node, anf: Partial<AcceptNodeFn> = {}): ParsedResult[] => {
  const parseds: ParsedResult[] = [];
  const acceptNode = acceptNodeWith(parseds, anf);

  if (acceptNode(node) === NodeFilter.FILTER_REJECT) return parseds;

  const tw = document.createTreeWalker(node, TARGET_NODE_TYPE, { acceptNode });

  while (tw.nextNode()) {}

  return parseds;
};
