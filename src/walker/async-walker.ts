import { acceptNode } from './shared/accept-node';
import { filterNodeType } from './shared/constant';
import { extractAttrText } from './shared/extract-attr-text';
import { hasChinese } from './shared/has-chinese';
import { ParsedNode } from './shared/types';

export async function* asyncWalker(dom: Node): AsyncIterable<ParsedNode> {
  const tw = document.createTreeWalker(dom, filterNodeType(), { acceptNode });
  const delay = <T>(data: T): Promise<T> => new Promise(rs => setTimeout(() => rs(data)));

  if (dom === document && hasChinese((dom as Document).title)) {
    yield delay({
      type: 'DOCUMENT' as 'DOCUMENT',
      node: dom as Document,
      text: (dom as Document).title,
    });
  }

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
