# TongWen Core Changelog

All notable changes to the "dark-lavender" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [4.0.0] - 2021-04-23

### Added

- Introduce a new `walkNode` node parser, which resolved many issues in tongwentang/tongwentang-extension.

### Fixed

- Export all utitlies functions and constants use with `walkNode` which can help developr customize `walkNode` behavior. Resolved #6.

### Deprecated

- Last parser `walker` is deprecated now and will be remove on next major version (v5.0.0) as well as its functions and constants.

## [3.2.5] - 2020-12-24

### Security

- Update deps for security alerts

### Changed

- export `LangType` as `enum` instead of `const enum` due `isolatedModules: true`

## [3.2.4] - 2020-09-06

### Security

- Update deps for security alerts

## [3.2.3]

### Security

- Update deps for security alerts

## [3.2.2]

### Security

- Update dependencies.

## [3.2.1]

### Fixed

- Update homepage and repo's url link.

### Security

- Update dependencis for security alerts.

## [3.2.0]

### Fixed

- Readme typo, `createConveter`_ => `createConverter`_
- `extractAttrText` filter by `hasChinese` to make sure no empty text parsed node.

### Changed

- Rename `hasTargetAttr`(s) to `isTargetAttr`(s) for semantic.

### Added

- Add reject guard to `acceptNode` and `walker`, now reject unneeded node by `node.nodeName` even for tree walker root.

## [3.1.0]

### Changed

- Move parse node to independ function.
- Remove unneeded document node in parse node function.

### Added

- export all helper functions in walker.

## [3.0.2]

### Fixed

- Export `ParsedNode` type.

## [3.0.1]

### Added

- Add converter and converter creator types.

## [3.0.0]

Converter in version 3 is completely rewrite, class pattern is replace by module pattern as well as Parser.
Parser is replace by walker and do not handle for update node value any more, just return the parsed nodes.
For more detail, please check latest README.

## [2.x.x]

- Please check here.
