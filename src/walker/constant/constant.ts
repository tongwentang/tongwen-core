export const TARGET_NODE_TYPE = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT;

export const TARGET_NODE_ATTRIBUTES = Object.freeze(['title', 'alt', 'placeholder', 'aria-label']);

export const REJECT_NODE_NAMES = Object.freeze(['SCRIPT', 'STYLE', 'LINK', 'META', 'FRAME', 'IFRAME']);

export const EDITABLE_NODE_NAMES = Object.freeze(['INPUT', 'TEXTAREA']);
