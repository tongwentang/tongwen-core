# TongWen Core Changelog

## 2.1.0
* IMPROVEMENT
  * `TWCore_Obj`: replace `in` to `hasOwnProperty` to improve performance.
  * `TWParser`: add `excludedNodeNames` ignore the node that does not need to convert.
* OTHER
  * Files structure changed, now source code move from /src to /src/lib.

## 2.0.1
* BREAKING CHANGES
  - patch for add prefix to NodeText type

## 2.0.0
* BREAKING CHANGES
  - Rename exported classes and interface name.
    - Interface prefix from `Core_*` to `TWC_*`.
    - `TongWenParser` to `TWParser`, `TongWenConvert` to `TWConverter`.
    - Introduce new `TWCore_Map` and `TWCore_Obj` to replace `TongWenCore` due difference data structure used inside `class`.
    - Add generic type on `TWC_BaseDic`, `TWC_RawDic`, and `TWC_Dic` due two difference data structure approach.
  - Format of dictionaries input on creating core changed from `{ s2t: { char: {}, phrase: {} }, t2s: { char: {}, phrase: {} } }` to `{ s2t: {}, t2s: {} }`.
* ADD
  - A new `TWCore_Map` implemented by ES6 `Map` that bring significant speed enhance (~= 1.8 time faster on V8 engine). While SpinderMonkey should consider keep using `Object` version.
- BUG FIXED
  - Fixed a critical bug that may lead convert become infinite iteration.

## 1.0.1
* DEPRECATED:
  - Install via git repo not longer provide postInstall process, you should do it your own.
* Prepare for npm publish
  - Move default `dictionaries` folder from `./src/` to `./`.
  * Add `CHANGELOG.md`.

## 1.0.0
* first release.
