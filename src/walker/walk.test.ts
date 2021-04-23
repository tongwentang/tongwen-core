/**
 * @jest-environment jsdom
 */

import { JSDOM } from 'jsdom';
import { ParsedResult } from './model/parsed';
import { walkNode } from './walk';

describe('test walkNode', () => {
  it('should extract parsed results', () => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <div>
          “？”
          <span>I 愛 U</span>
          <span>Should not extract none target string!!</span>
          <div id="editable" contenteditable="true" aria-label="可編輯的 attribute">可編輯的內容</div>
          <a href="https://www.example.com" title="首頁"></a>
        </div>
      </body>
    `);

    const spy = jest.spyOn(global, 'document', 'get');
    spy.mockImplementation(() => dom.window.document);

    const parseds = walkNode(dom.window.document.body);
    const div = dom.window.document.querySelector('div')!;
    const [span1] = Array.from(dom.window.document.querySelectorAll('span'));
    const editable = dom.window.document.querySelector('div#editable')!;
    const a = dom.window.document.querySelector('a')!;
    const expected: ParsedResult[] = [
      { type: 'TEXT', node: div.childNodes[0], text: div.childNodes[0].nodeValue! },
      { type: 'TEXT', node: span1.childNodes[0], text: 'I 愛 U' },
      { type: 'ELEMENT', node: editable, attr: 'aria-label', text: '可編輯的 attribute' },
      { type: 'ELEMENT', node: a, attr: 'title', text: '首頁' },
    ];

    expect(parseds).toEqual(expected);
  });
});
