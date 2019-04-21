import { createDicMap, createDicObj } from './create-dic';
import { indexedPackMap } from './map/index-pack-map.test';
import { indexedPackObj } from './obj/index-pack-obj.test';
import { srcPack } from './shared/group-pack.test';

describe('Test createDic functionality', () => {
  it('should convert srcPack to IndexedPackObj', () => {
    const result = createDicObj(srcPack);
    expect(result).toEqual(indexedPackObj);
  });

  it('should convert srcPack to IndexedPackMap', () => {
    const result = createDicMap(srcPack);
    expect(result).toEqual(indexedPackMap);
  });
});
