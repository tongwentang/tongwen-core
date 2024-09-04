import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createDicMap, createDicObj } from './create-dic.js';
import { indexedPackMap } from './map/index-pack-map.test.js';
import { indexedPackObj } from './obj/index-pack-obj.test.js';
import { srcPack } from './shared/group-pack.test.js';

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
