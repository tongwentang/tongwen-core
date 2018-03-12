# TongWenCore and TongWen

A fast converter between Traditional Chinese and Simplified Chinese.

This repository has two classes, TongWenCore for convert character between Traditional Chinese and Simplified Chinese, TongWenParser for travese DOM tree and collect meaningful text. Both classes are `Promise` friendly.

## Installation

Install by npm:
```bash
$ npm install tongwen-core
```

Install by yarn:
```bash
$ yarn add tongwen-core
```

## Examples and Usages

Note: Example scripts are all written in TypeScript, so there will be some types annotation.

A example for how to use TongWenCore:

```typescript
(async () => {
  // assuming dics is ready
  // const dics: Core_RawGroupDic = ...
  const core = await TongWenCore.create(dics);
  const result = await core.convert('9天后', 's2t');
  // result === '9天後'
})();
```

Note: You should provide dictionaries when creating instance of TongWenCore, it does not contain any default dictionaries.

Here is an example for using TongWenCore and TongWenParser in browser extension development.

```typescript
// background-script
(async function main() {
  const core = await TongWenCore.create(dics);

  browser.runtime.onMessage.addListener(async (req, sender, res) => {
    return req.nodeTexts.map(nodeText => core.convertSync(nodeText.text, req.target));
  });
})();

// content-script
(async function main() {
  const converter: TongWenConverter = async (
    nodeTexts: NodeText[],
    target: ConvertTarget,
  ): Promise<NodeText[]> => {
    return browser.runtime.sendMessage({ nodeTexts, target });
  };

  const walker = new TongWenParser(converter);

  walker.convertPage(document, 's2t');
})();
```

## API and Types

This project provide only 2 classes, below is classes and its public methods：

* classs TongWenCore
  * static create()
  * static createSync()
  * convert()
  * convertSync()
  * convertChar()
  * convertCharSync()
* TongWenParser
  * convertPage()

### Recommanded for development

* Editor: Visual Studio Code
  * For best TypeScript support
  * Packages: prettier - code formater, TypeScript Toolbox
* Environment
  * `node`
  * `yarn`
* `npm` scripts：
  * `test`：test for any TypeScript error
  * `format`：format files on `src/`

## Story

TongWenCore and TongWenParser derived from the core converter of [New Tongwentang](https://github.com/tongwentang/New-Tongwentang-for-Firefox) extension (version 1.5), which a browser extension that provide functionality for convert charaters between Traditional Chinese and Simplified Chinese who developed by [softcup](https://github.com/softcup).

TongWenCore and TongWenParser extract from the extension as a independent repository and totally rewrite with TypeScript to make it more solid.

Convert speed of TongWenCore is faster than New Tongwentang Core (about 3.x time faster which tested in certain case). Convert Algorithm have been redesign, the idea was originally from [cookwu](https://github.com/cookwu) and [t7yang](https://github.com/t7yang) who implemented in TypeScript.

## Lisence

MIT
