export type ParsedNode =
  | { type: 'DOCUMENT'; node: Document; text: string }
  | { type: 'ATTRIBUTE'; node: HTMLElement; text: string; attr: string }
  | { type: 'TEXT'; node: HTMLElement; text: string };
