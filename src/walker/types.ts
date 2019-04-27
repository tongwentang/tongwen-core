export type ParsedNode =
  | { type: 'ATTRIBUTE'; node: HTMLElement; text: string; attr: string }
  | { type: 'TEXT'; node: HTMLElement; text: string };
