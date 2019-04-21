# TongWenCore (新同文堂核心)

一個針對正體中文和簡體中文的轉換器及一個 DOM 樹蒐集的輔助工具。

## 安裝

Install by npm:
```bash
$ npm install tongwen-core
```

Install by yarn:
```bash
$ yarn add tongwen-core
```

## 範例及使用

注意：以下範例程式碼以 TypeScript 撰寫。

轉換器的使用範例：

```typescript
import { createConveterMap, createConveterObj, LangType, SrcPack } from 'tongwen-core';

const dics: SrcPack = { s2t: [{ 台湾: '台灣' }], t2s: [{ 台灣: '台湾' }] };
const mConv = createConveterMap(dics);
const oConv = createConveterObj(dics);
const result = [mConv.phrase(LangType.s2t, '台湾'), oConv.phrase(LangType.s2t, '台湾')];
console.log(result); // [ '台灣', '台灣' ]
```

> `createConverterMap` 跟 `createConverterObj` 的差別在於前者使用 es `Map` ， <br>
> 後者使用一般的 `Object` 作為內部資料結構。請根據你的環境選擇使用的版本， <br> 
> 但在允許的情況下建議使用 es `Map` 的版本，因為效能可以提升 2.x 倍。

注意：建立轉換器時必須提供字典檔，沒有預設字典檔。

以下是網頁中使用轉換器和 walker 的範例。

```typescript
import { createConveterMap, LangType, SrcPack, walker } from 'tongwen-core';

const dics: SrcPack = { s2t: [{ 台湾: '台灣' }], t2s: [{ 台灣: '台湾' }] };
const mConv = createConveterMap(dics);

for (const n of walker(document)) {
  switch (n.type) {
    case 'DOCUMENT':
      n.node.title = mConv.phrase(LangType.s2t, n.text);
      break;
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

## 字典檔
這個專案內提供的字典檔僅作為測試使用，並不建議直接使用它們當作正式的字典檔，因為它們是針對 v1.5 版新同文堂核心演算法的字典檔。我們計畫在未來釋出一個字典檔的獨立程式碼庫。

## API 及型別

轉換器

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

walker

```typescript
type ParsedNode =
  | { type: 'DOCUMENT'; node: Document; text: string }
  | { type: 'ATTRIBUTE'; node: HTMLElement; text: string; attr: string }
  | { type: 'TEXT'; node: HTMLElement; text: string };

type Walker = (dom: Node) => ParsedNode[];
```

更多的細節，請參閱原始碼。

### 開發建議

* 編輯器：Visual Studio Code
  * 取得最佳的 TypeScript 支援
  * 套件：prettier - code formater, TypeScript Toolbox
* 環境
  * `node`
  * `yarn`
* `npm` 指令：
  * `test`：測試撰寫的 TypeScript 是否有錯誤

## 故事

TongWenCore 和 TongWenParser 是源自於由 [softcup](https://github.com/softcup) 開發的正體／繁體及簡體轉換的瀏覽器套件 [新同文堂](https://github.com/tongwentang/New-Tongwentang-for-Firefox) （版本 1.5）。

TongWenCore 和 TongWenParser 從套件中抽取出來並成為一個獨立專案，同時以 TypeScript 完全重寫，讓程式碼更加強健。

TongWenCore 的轉換速度比起新同文堂的核心更快。（在某個測試的條件下快上 3.x 倍）。轉換的演算法倍重新設計過，改良的概念來自於 [cookwu](https://github.com/cookwu) 並由 [t7yang](https://github.com/t7yang) 以 TypeScript 實作。

## Lisence

MIT
