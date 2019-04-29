# TongWen Core Changelog

### v3.2.0
- Fix
  - Readme typo, `createConveter`* => `createConverter`*
  - `extractAttrText` filter by `hasChinese` to make sure no empty text parsed node.
- Refactor
  - Rename `hasTargetAttr`(s) to `isTargetAttr`(s) for semantic.
- Feature
  - Add reject guard to `acceptNode` and `walker`, now reject unneeded node by `node.nodeName` even for tree walker root.

### v3.1.0
- Refactor
  - Move parse node to independ function.
  - Remove unneeded document node in parse node function.
- Feature
  - export all helper functions in walker.

### v3.0.2
- Fix
  - Export `ParsedNode` type.

### v3.0.1
- Feature
  - Add converter and converter creator types.

### v3.0.0
Converter in version 3 is completely rewrite, class pattern  is replace by module pattern as well as Parser.

Parser is replace by walker and do not handle for update node value any more, just return the parsed nodes.

For more detail, please check latest README.

### v2.x.x
- Please check here.
