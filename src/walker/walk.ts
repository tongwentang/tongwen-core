import { acceptNodeConfig, AcceptNodeConfig, acceptNodeWith } from './accept-node/accept-node.js';
import { TARGET_NODE_TYPE } from './constant/constant.js';
import type { ParsedResult } from './model/parsed.js';

export const walkNode = (node: Node, config: Partial<AcceptNodeConfig> = {}): ParsedResult[] => {
  const parseds: ParsedResult[] = [];
  const acceptNode = acceptNodeWith(parseds, { ...acceptNodeConfig, ...config });

  if (acceptNode(node) === NodeFilter.FILTER_REJECT) return parseds;

  const tw = document.createTreeWalker(node, TARGET_NODE_TYPE, { acceptNode });

  while (tw.nextNode()) {}

  return parseds;
};
