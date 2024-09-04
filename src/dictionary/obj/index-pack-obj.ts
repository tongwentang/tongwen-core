import { DicObj, GroupedPack, GroupedPair, IndexedMultiObj, IndexedObj, IndexedPackObj, IndexedPairObj } from '../type';

const indexMulti = (multi: DicObj): IndexedMultiObj =>
  Object.entries(multi).reduce((list, [key, value]) => {
    const index = key.substring(0, 2);
    const indexed: IndexedObj = list[index] || (list[index] = { max: 0, indies: {} });
    key.length > indexed.max && (indexed.max = key.length);
    indexed.indies[key] = value;
    return list;
  }, {} as IndexedMultiObj);

const indexSuit = ({ single, multi }: GroupedPair): IndexedPairObj => ({
  single,
  multi: indexMulti(multi),
});

export const indexPackObj = ({ s2t, t2s }: GroupedPack): IndexedPackObj => ({
  s2t: indexSuit(s2t),
  t2s: indexSuit(t2s),
});
