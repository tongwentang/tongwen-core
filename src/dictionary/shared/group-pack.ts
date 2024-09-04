import type { GroupedPack, GroupedPair, SrcPack } from '../type.js';

const mergeList = (list: Record<string, string>[]) => Object.assign({}, ...list);

const group = (words: Record<string, string>): GroupedPair =>
  Object.entries(words).reduce(
    (grouped, [key, value]) =>
      key.length > 1 ? ((grouped.multi[key] = value), grouped) : ((grouped.single[key] = value), grouped),
    { single: {}, multi: {} } as GroupedPair,
  );

export const groupPack = (src: SrcPack): GroupedPack => ({
  s2t: group(mergeList(src.s2t)),
  t2s: group(mergeList(src.t2s)),
});
