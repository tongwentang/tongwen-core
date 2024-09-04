import assert from 'node:assert';
import { describe, it } from 'node:test';
import { groupedPack } from '../shared/group-pack.test.js';
import type { IndexedPackObj } from '../type.js';
import { indexPackObj } from './index-pack-obj.js';

export const indexedPackObj: IndexedPackObj = {
  s2t: {
    single: { 个: '個', 们: '們' },
    multi: {
      一只: { max: 2, indies: { 一只: '一隻' } },
      一天: { max: 3, indies: { 一天后: '一天後' } },
    },
  },
  t2s: {
    single: { 個: '个', 們: '们' },
    multi: {
      一隻: { max: 2, indies: { 一隻: '一只' } },
      一天: { max: 3, indies: { 一天后: '一天後' } },
    },
  },
};

describe('Test indexPack functionality', () => {
  it('should convert groupedPack to indexedPack', () => {
    const result = indexPackObj(groupedPack);
    assert.deepEqual(result, indexedPackObj);
  });
});
