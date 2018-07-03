import { TWC_Target } from '../tongwen-core';

export class TWParser {
  protected converter: TWConverter;

  constructor(converter: TWConverter) {
    this.converter = converter;
  }

  async convertPage(doc: Document, target: TWC_Target) {
    const nodes: Array<HTMLElement | Document> = [];
    const nodeTexts: TWNodeText[] = [];
    nodes.push(document);
    nodeTexts.push({ type: 'document', text: doc.title });

    const whatToShow = NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT;
    const treeWalker = doc.createTreeWalker(doc.body, whatToShow);

    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode as HTMLElement;

      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          if (excludedNodeNames.includes(node.nodeName)) {
            break;
          }

          includedAttr.forEach(attrName => {
            const attrValue = node.getAttribute(attrName) || '';
            if (attrValue.trim().length > 0) {
              nodes.push(node);
              nodeTexts.push({ type: 'element', attr: attrName, text: attrValue });
            }
          });
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

  protected replacer(nodes: Array<HTMLElement | Document>, nodeTexts: TWNodeText[]) {
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

export interface TWConverter {
  (nodeTexts: TWNodeText[], target: TWC_Target): Promise<TWNodeText[]>;
}

export interface TWNodeText {
  type: 'document' | 'element' | 'text';
  attr?: string;
  text: string;
}

const excludedNodeNames = [
  'frame',
  'iframe',
  'embed',
  'object',
  'script',
  'noscript',
  'style',
  'title',
  'br',
  'hr',
  'link',
  'meta',
];

const includedAttr = ['title', 'alt', 'placeholder'];
