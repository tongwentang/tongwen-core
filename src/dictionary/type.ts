type TObj<T> = Record<string, T>;

type TMap<T> = Map<string, T>;

export type DicObj = TObj<string>;

export type DicMap = TMap<string>;

export enum LangType {
  s2t = 's2t',
  t2s = 't2s',
}

type TSMPair<S, M = S> = { single: S; multi: M };

export type GroupedPair = TSMPair<DicObj>;

export type Indexed<T> = { max: number; indies: T };

export type IndexedObj = Indexed<DicObj>;

export type IndexedMap = Indexed<DicMap>;

export type IndexedMultiObj = TObj<IndexedObj>;

export type IndexedMultiMap = TMap<IndexedMap>;

export type IndexedPairObj = TSMPair<DicObj, IndexedMultiObj>;

export type IndexedPairMap = TSMPair<DicMap, IndexedMultiMap>;

type Pack<T> = Record<LangType, T>;

export type SrcPack = Pack<DicObj[]>;

export type GroupedPack = Pack<TSMPair<DicObj>>;

export type IndexedPackObj = Pack<IndexedPairObj>;

export type IndexedPackMap = Pack<IndexedPairMap>;
