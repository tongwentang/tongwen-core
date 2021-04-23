/**
 * @deprecated will remove on next major version v5.0.0
 */
export type ParsedNode =
  | { type: 'ATTRIBUTE'; node: HTMLElement; text: string; attr: string }
  | { type: 'TEXT'; node: HTMLElement; text: string };
