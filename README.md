# TongWen Core converter

A fast converter between Traditional Chinese and Simplified Chinese.

This project provided a way to convert character between Traditional Chinese and Simplified Chinese in speed. A core and a parser being provided, the former help you to convert string, and the latter help you to travese DOM tree and collect meaningful text.

## Installation

Install by npm:
```bash
npm install tongwen-core
```

Install by yarn:
```bash
yarn add tongwen-core
```

## Examples and Usages

Note: Example scripts are all written in TypeScript, so there will be some types annotation.

A example for how to use core:

```typescript
(async () => {
  const dics = { s2t: { 台湾: '台灣' }, t2s: { 台灣: '台湾' } };
  const core = await TWCore_Obj.create(dics);
  const result = await core.convert('台湾', 's2t');
  // result === '台灣'
})();
```

Note: You should provide dictionaries when creating instance of core, core class does not include any default dictionaries as property.

Here is an example for using core and parser in browser extension development.

```typescript
// background-script
(async function main() {
  const core = await TWCore_Obj.create(dics);

  browser.runtime.onMessage.addListener(async (req, sender, res) => {
    return req.nodeTexts.map(nodeText => core.convertSync(nodeText.text, req.target));
  });
})();

// content-script
(async function main() {
  const converter: TW_Converter = async (
    nodeTexts: NodeText[],
    target: ConvertTarget,
  ): Promise<NodeText[]> => {
    return browser.runtime.sendMessage({ nodeTexts, target });
  };

  const parser = new TWParser(converter);

  parser.convertPage(document, 's2t');
})();
```

## Dictionaries
Dictionaries that included in this project is use only for test, you can use them but not recommmanded, since they are for v1.5 New TongWenTang Core algorithm. We plan to release a independent dictionary repository in the futher.

## API and Types

There have two core class which share the same interface `ITWCore`, and the parser has its own.

```typescript
interface ITWCore {
  convertSync(text: string, target: TWC_Target): string;
  convert(text: string, target: TWC_Target): Promise<string>;
  convertCharSync(text: string, target: TWC_Target): string;
  convertChar(text: string, target: TWC_Target): Promise<string>;
}

class TWParser {
  async convertPage(doc: Document, target: TWC_Target): Promise<void> {}
}
```

For more detail, please check the TypeScript source code.

### Recommanded for development

* Editor: Visual Studio Code
  * For best TypeScript support
  * Packages: prettier - code formater, TypeScript Toolbox
* Environment
  * `node`
  * `yarn`
* `npm` scripts：
  * `test`：test for any TypeScript error

## Story

TongWenCore and TongWenParser derived from the core converter of [New Tongwentang](https://github.com/tongwentang/New-Tongwentang-for-Firefox) extension (version 1.5), which a browser extension that provide functionality for convert charaters between Traditional Chinese and Simplified Chinese who developed by [softcup](https://github.com/softcup).

TongWenCore and TongWenParser extract from the extension as a independent repository and totally rewrite with TypeScript to make it more solid.

Convert speed of TongWenCore is faster than New Tongwentang Core (about 3.x time faster which tested in certain case). Convert Algorithm have been redesign, the idea was originally from [cookwu](https://github.com/cookwu) and [t7yang](https://github.com/t7yang) who implemented in TypeScript.

## Lisence

MIT
