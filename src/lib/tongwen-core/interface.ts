export type TWC_Target = 's2t' | 't2s';

export type TWC_Obj = { [key: string]: string };

export type TWC_SortedData<T> = {
  maxLength: number;
  map: T;
};

export type TWC_SortedObj = {
  [key: string]: TWC_SortedData<TWC_Obj>;
};

export type TWC_Map = Map<string, string>;

export type TWC_SortedMap = Map<string, TWC_SortedData<TWC_Map>>;

export interface TWC_BaseDic<T, U> {
  single: T;
  multi: U;
}

export interface TWC_RawDic {
  s2t: TWC_Obj;
  t2s: TWC_Obj;
}

export interface TWC_Dic<T extends TWC_Map | TWC_Obj, U extends TWC_SortedMap | TWC_SortedObj> {
  s2t: TWC_BaseDic<T, U>;
  t2s: TWC_BaseDic<T, U>;
}

export interface ITWCore {
  convertSync(text: string, target: TWC_Target): string;
  // convert(text: string, target: TWC_Target): Promise<string>;
  convertCharSync(text: string, target: TWC_Target): string;
  // convertChar(text: string, target: TWC_Target): Promise<string>;
}
