import { groupedPack } from '../shared/group-pack.test';
import { IndexedPackMap } from '../type';
import { indexPackMap } from './index-pack-map';

export const indexedPackMap: IndexedPackMap = {
  s2t: {
    single: new Map([['个', '個'], ['们', '們']]),
    multi: new Map([
      ['一只', { max: 2, indies: new Map([['一只', '一隻']]) }],
      ['一天', { max: 3, indies: new Map([['一天后', '一天後']]) }],
    ]),
  },
  t2s: {
    single: new Map([['個', '个'], ['們', '们']]),
    multi: new Map([
      ['一隻', { max: 2, indies: new Map([['一隻', '一只']]) }],
      ['一天', { max: 3, indies: new Map([['一天后', '一天後']]) }],
    ]),
  },
};

describe('Test indexPack functionality', () => {
  it('should convert groupedPack to indexedPack', () => {
    const result = indexPackMap(groupedPack);
    expect(result).toEqual(indexedPackMap);
  });
});
