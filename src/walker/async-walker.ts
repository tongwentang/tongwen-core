import { acceptNode } from './shared/accept-node';
import { filterNodeType } from './shared/constant';
import { extractAttrText } from './shared/extract-attr-text';
import { ParsedNode } from './types';

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
