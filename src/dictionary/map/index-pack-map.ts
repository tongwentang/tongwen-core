import { toEsMap } from '../shared/to-esmap';
import {
  DicObj,
  GroupedPack,
  GroupedPair,
  IndexedMap,
  IndexedMultiMap,
  IndexedPackMap,
  IndexedPairMap,
} from '../type';

const indexMulti = (multi: DicObj): IndexedMultiMap =>
  Object.entries(multi).reduce((list, [key, value]) => {
    const index = key.substring(0, 2);
    const indexed: IndexedMap =
      list.get(index) || (list.set(index, { max: 0, indies: new Map() }), list.get(index));
    key.length > indexed.max && (indexed.max = key.length);
    indexed.indies.set(key, value);
    return list;
  }, new Map());

const indexSuit = ({ single, multi }: GroupedPair): IndexedPairMap => ({
  single: toEsMap(single),
  multi: indexMulti(multi),
});

export const indexPackMap = ({ s2t, t2s }: GroupedPack): IndexedPackMap => ({
  s2t: indexSuit(s2t),
  t2s: indexSuit(t2s),
});
