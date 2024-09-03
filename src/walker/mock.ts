import { JSDOM } from 'jsdom';

// Mock NodeFilter before any other code runs
const dom = new JSDOM();
globalThis.document = dom.window.document;
globalThis.NodeFilter = dom.window.NodeFilter;
globalThis.Node = dom.window.Node;
