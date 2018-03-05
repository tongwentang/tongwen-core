import { ConvertTarget } from '../tongwen-core/interface';

export class TongWenParser {
  protected converter: TongWenConverter;

  constructor(converter: TongWenConverter) {
    this.converter = converter;
  }

  async convertPage(doc: Document, target: ConvertTarget) {
    const nodes: Array<HTMLElement | Document> = [];
    const nodeTexts: NodeText[] = [];
    nodes.push(document);
    nodeTexts.push({ type: 'document', text: doc.title });

    const whatToShow = NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT;
    const treeWalker = doc.createTreeWalker(doc.body, whatToShow);

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode as HTMLElement;

      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          for (const attrName of ['title', 'alt']) {
            const attrValue = node.getAttribute(attrName) || '';
            if (attrValue.trim()) {
              nodes.push(node);
              nodeTexts.push({ type: 'element', attr: attrName, text: attrValue });
            }
          }
          break;
        case Node.TEXT_NODE:
          if ((node.nodeValue || '').trim()) {
            nodes.push(node);
            nodeTexts.push({ type: 'text', text: node.nodeValue || '' });
          }
          break;
        default:
          break;
      }
    }

    const converted = await this.converter(nodeTexts, target);

    return this.replacer(nodes, converted);
  }

  protected replacer(nodes: Array<HTMLElement | Document>, nodeTexts: NodeText[]) {
    nodes.map((node, index) => {
      if (node) {
        switch (nodeTexts[index].type) {
          case 'text':
            node.nodeValue = nodeTexts[index].text;
            return true;
          case 'element':
            (<HTMLElement>node).setAttribute(nodeTexts[index].attr || '', nodeTexts[index].text);
            return true;
          case 'document':
            node.title = nodeTexts[index].text;
            return true;
          default:
            return false;
        }
      } else {
        return false;
      }
    });
  }
}

export interface TongWenConverter {
  (nodeTexts: NodeText[], target: ConvertTarget): Promise<NodeText[]>;
}

export interface NodeText {
  type: 'document' | 'element' | 'text';
  attr?: string;
  text: string;
}
