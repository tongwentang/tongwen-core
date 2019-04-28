# TongWen Core converter

A fast converter between Traditional Chinese and Simplified Chinese and a helper DOM tree walker.

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

Note: Example scripts are all written in TypeScript.

An example for how to use converter:

```typescript
import { createConverterMap, createConverterObj, LangType, SrcPack } from 'tongwen-core';

const dics: SrcPack = { s2t: [{ 台湾: '台灣' }], t2s: [{ 台灣: '台湾' }] };
const mConv = createConverterMap(dics);
const oConv = createConverterObj(dics);
const result = [mConv.phrase(LangType.s2t, '台湾'), oConv.phrase(LangType.s2t, '台湾')];
console.log(result); // [ '台灣', '台灣' ]
```

> The difference between `createConverterMap` and `createConverterObj` is the former use es `Map` and <br>
> the latter use plain `Object` as internal data structure. Use depend on your environment, <br> 
> but the es version is highly recommended, due performance boost can up to 2.x time faster.

Note: You should provide dictionaries when creating converter, no default dictionaries.

Here is an example for using converter and walker in web page.

```typescript
import { createConverterMap, LangType, SrcPack, walker } from 'tongwen-core';

const dics: SrcPack = { s2t: [{ 台湾: '台灣' }], t2s: [{ 台灣: '台湾' }] };
const mConv = createConverterMap(dics);

for (const n of walker(document)) {
  switch (n.type) {
    case 'TEXT':
      n.node.nodeValue = mConv.phrase(LangType.s2t, n.text);
      break;
    case 'ATTRIBUTE':
      n.node.setAttribute(n.attr, mConv.phrase(LangType.s2t, n.text));
    default:
      break;
  }
}
```

## Dictionaries
Dictionaries that included in this project is use only for test, you can use them but not recommmanded, since they are for v1.5 New TongWenTang Core algorithm. We plan to release a independent repository in the future.

## API and Types

For converter

```typescript
// The source dictionaries collection
type SrcPack = {
    s2t: Record<string, string>[];
    t2s: Record<string, string>[];
}
const dics: SrcPack = { s2t: [{ 台湾: '台灣' }], t2s: [{ 台灣: '台湾' }] };

// Converter type
type Converter = {
  set: (src: SrcPack) => undefined;
  char: (type: LangType, text: string) => string;
  phrase: (type: LangType, text: string) => string;
}
```

For walker:

```typescript
type ParsedNode =
  | { type: 'ATTRIBUTE'; node: HTMLElement; text: string; attr: string }
  | { type: 'TEXT'; node: HTMLElement; text: string };

type Walker = (dom: Node) => ParsedNode[];
```

For more detail, please check the source code.

### Recommanded for development

- Editor: Visual Studio Code
  - For best TypeScript support
  - Packages: prettier - code formater, TypeScript Toolbox
- Environment
  - `node`
  - `yarn`
- `npm` scripts：
  - `test`：test for any TypeScript error

## Story

TongWenCore and TongWenParser derived from the core converter of [New Tongwentang](https://github.com/tongwentang/New-Tongwentang-for-Firefox) extension (version 1.5), which a browser extension that provide functionality for convert charaters between Traditional Chinese and Simplified Chinese who developed by [softcup](https://github.com/softcup).

TongWenCore and TongWenParser extract from the extension as a independent repository and totally rewrite with TypeScript to make it more solid.

Convert speed of TongWenCore is faster than New Tongwentang Core (about 3.x time faster which tested in certain case). Convert Algorithm have been redesign, the idea was originally from [cookwu](https://github.com/cookwu) and [t7yang](https://github.com/t7yang) who implemented in TypeScript.

## Lisence

MIT
