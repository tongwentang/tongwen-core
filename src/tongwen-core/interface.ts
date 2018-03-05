export type ConvertTarget = 's2t' | 't2s';

export interface Core_Map {
  [key: string]: string;
}

export interface Core_SortedMap {
  [key: string]: {
    maxLength: number;
    mappings: Core_Map;
  };
}

export interface Core_BaseDic {
  char: Core_Map;
  phrase: Core_Map;
}

export interface Core_SortedBaseDic extends Core_BaseDic {
  sortedPhrase: Core_SortedMap;
}

export interface Core_RawGroupDic {
  s2t: Core_BaseDic;
  t2s: Core_BaseDic;
}

export interface Core_SortGroupDic {
  s2t: Core_SortedBaseDic;
  t2s: Core_SortedBaseDic;
}
