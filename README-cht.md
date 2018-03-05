# TongWenCore (新同文堂核心)

一個針對正體／繁體中文和簡體中文的快速轉換器。

這個專案提供了兩個類別， TongWenCore 是正體／繁體和簡體的轉換核心， TongWenParser 則是負責跑遍 DOM 結構並蒐集有意義的文字。兩者皆是 `Promise` 友善。

## 安裝

目前僅能使用 git 協定的方式進行安裝。NPM 套件還在努力中。

## 範例及使用

注意：所有範例程式碼都是以 TypeScript 撰寫，所以會有型別的註釋。

TongWenCore 的使用範例：

```typescript
(async () => {
  // assuming dics is ready
  // const dics: Core_RawGroupDic = ...
  const core = await TongWenCore.create(dics);
  const result = await core.convert('9天后', 's2t');
  // result === '9天後'
})();
```

注意：你必須在建立 TongWenCore 實體時提供字典檔並沒有提供預設的字典檔。

這是一個有關如何在瀏覽器套件中使用 TongWenCore 和 TongWenParser 的範例。

```typescript
// background-script
import { TongWenCore } from 'tonwen';

(async function main() {
  const core = await TongWenCore.create(dics);

  browser.runtime.onMessage.addListener(async (req, sender, res) => {
    return req.nodeTexts.map(nodeText => core.convertSync(nodeText.text, req.target));
  });
})();

// content-script
import { TongWenParser, TongWenConverter } from 'tonwen';

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

## API 及型別

此專案只提供兩個類別，以下是類別及其公開成員：

* classs TongWenCore
  * static create()
  * static createSync()
  * convert()
  * convertSync()
  * convertChar()
  * convertCharSync()
* TongWenParser
  * convertPage()

### 開發建議

* 編輯器：Visual Studio Code
  * 取得最佳的 TypeScript 支援
  * 套件：prettier - code formater, TypeScript Toolbox
* 環境
  * `node`
  * `yarn`
* `npm` 指令：
  * `test`：測試撰寫的 TypeScript 是否有錯誤
  * `format`：使用 prettier 對 `src/` 檔案進行排版

## 故事

TongWenCore 和 TongWenParser 是源自於由 [softcup](https://github.com/softcup) 開發的正體／繁體及簡體轉換的瀏覽器套件 [新同文堂](https://github.com/tongwentang/New-Tongwentang-for-Firefox) （版本 1.5）。

TongWenCore 和 TongWenParser 從套件中抽取出來並成為一個獨立專案，同時以 TypeScript 完全重寫，讓程式碼更加強健。

TongWenCore 的轉換速度比起新同文堂的核心更快。（在某個測試的條件下快上 3.x 倍）。轉換的演算法倍重新設計過，改良的概念來自於 [cookwu](https://github.com/cookwu) 並由 [t7yang](https://github.com/t7yang) 以 TypeScript 實作。

## Lisence

MIT
