import { GroupedPack, SrcPack } from '../type';
import { groupPack } from './group-pack';

export const srcPack: SrcPack = {
  s2t: [{ 个: '個', 们: '們' }, { 一只: '一隻', 一天后: '一天後' }],
  t2s: [{ 個: '个', 們: '们' }, { 一隻: '一只', 一天后: '一天後' }],
};

export const groupedPack: GroupedPack = {
  s2t: { single: { 个: '個', 们: '們' }, multi: { 一只: '一隻', 一天后: '一天後' } },
  t2s: { single: { 個: '个', 們: '们' }, multi: { 一隻: '一只', 一天后: '一天後' } },
};

describe('Test groupPack functionality', () => {
  it('should convert srcPack to groupPack', () => {
    const result = groupPack(srcPack);
    expect(result).toEqual(groupedPack);
  });
});
