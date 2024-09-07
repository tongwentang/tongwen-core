import { acceptNode } from './shared/accept-node.js';
import { filterNodeType } from './shared/constant.js';
import { extractAttrText } from './shared/extract-attr-text.js';
import type { ParsedNode } from './types.js';

/**
 * @deprecated will remove on next major version v5.0.0
 */
export async function* asyncWalker(dom: Node): AsyncIterable<ParsedNode> {
  const tw = document.createTreeWalker(dom, filterNodeType(), { acceptNode });
  const delay = <T>(data: T): Promise<T> => new Promise(rs => setTimeout(() => rs(data)));

  while (tw.nextNode()) {
    const node = tw.currentNode as HTMLElement;

    switch (node.nodeType) {
      case Node.TEXT_NODE:
        yield delay({ type: 'TEXT' as 'TEXT', node, text: node.nodeValue! });
        break;
      case Node.ELEMENT_NODE:
        for (const [attr, text] of extractAttrText(node)) {
          yield delay({ type: 'ATTRIBUTE' as 'ATTRIBUTE', node, text, attr });
        }
        break;
      default:
        break;
    }
  }
}
