import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createDicMap, createDicObj } from './create-dic';
import { indexedPackMap } from './map/index-pack-map.test';
import { indexedPackObj } from './obj/index-pack-obj.test';
import { srcPack } from './shared/group-pack.test';

describe('Test createDic functionality', () => {
  it('should convert srcPack to IndexedPackObj', () => {
    const result = createDicObj(srcPack);
    assert.deepEqual(result, indexedPackObj);
  });

  it('should convert srcPack to IndexedPackMap', () => {
    const result = createDicMap(srcPack);
    assert.deepEqual(result, indexedPackMap);
  });
});
