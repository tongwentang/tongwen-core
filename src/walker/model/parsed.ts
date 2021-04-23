export interface ParsedTextNode {
  type: 'TEXT';
  node: Node;
  text: string;
}

export interface ParsedElementNode {
  type: 'ELEMENT';
  node: Element;
  attr: string;
  text: string;
}

export type ParsedResult = ParsedTextNode | ParsedElementNode;
