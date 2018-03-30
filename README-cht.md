# TongWenCore (新同文堂核心)

一個針對正體／繁體中文和簡體中文的快速轉換器。

這個專案提供一個快速的正體／繁體和簡體的轉換方案，分別有核心和解析器，前者負責轉換字串，後者負責負責跑遍 DOM 結構並蒐集有意義的文字。

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

注意：所有範例程式碼都是以 TypeScript 撰寫，所以會有型別的註釋。

TongWenCore 的使用範例：

```typescript
(async () => {
  const dics = { s2t: { 台湾: '台灣' }, t2s: { 台灣: '台湾' } };
  const core = await TWCore_Obj.create(dics);
  const result = await core.convert('台湾', 's2t');
  // result === '台灣'
})();
```

注意：你必須在建立核心實例時提供相應的字典檔，核心並不預設內見字典檔。

這是一個有關如何在瀏覽器套件中使用核心和解析器的範例。

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

## 字典檔
這個專案內提供的字典檔僅作為測試使用，並不建議直接使用它們當作正式的字典檔，因為它們是針對 v1.5 版新同文堂核心演算法的字典檔。我們計畫在未來釋出一個字典檔的獨立程式碼庫。

## API 及型別

專案有兩個實作一樣介面 `ITWCore` 的核心類別，解析器則有他自己的型別。

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

更多詳情，請直接閱讀 TypeScript 原始碼.

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
