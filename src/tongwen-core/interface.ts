export type TWC_Target = 's2t' | 't2s';

export type TWC_Obj = { [key: string]: string };

export type TWC_SortedObj = {
  [key: string]: {
    maxLength: number;
    map: TWC_Obj;
  };
};

export type TWC_Map = Map<string, string>;

export type TWC_SortedMapData = {
  maxLength: number;
  map: TWC_Map;
};

export type TWC_SortedMap = Map<string, TWC_SortedMapData>;

export interface TWC_BaseDic<T, U> {
  single: T;
  multi: U;
}

export interface TWC_RawDic<T> {
  s2t: T;
  t2s: T;
}

export interface TWC_Dic<T, U> {
  s2t: TWC_BaseDic<T, U>;
  t2s: TWC_BaseDic<T, U>;
}

export interface ITWCore {
  convertSync(text: string, target: TWC_Target): string;
  convert(text: string, target: TWC_Target): Promise<string>;
  convertCharSync(text: string, target: TWC_Target): string;
  convertChar(text: string, target: TWC_Target): Promise<string>;
}
