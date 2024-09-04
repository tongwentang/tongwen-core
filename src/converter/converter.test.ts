import assert from 'node:assert';
import { describe, it } from 'node:test';
import s2tChar from '../../dictionaries/s2t-char.json' with { type: 'JSON' };
import s2tPhrase from '../../dictionaries/s2t-phrase.json' with { type: 'JSON' };
import t2sChar from '../../dictionaries/t2s-char.json' with { type: 'JSON' };
import t2sPhrase from '../../dictionaries/t2s-phrase.json' with { type: 'JSON' };
import { LangType, type SrcPack } from '../dictionary/type.js';
import { createConverterMap } from './map/index.js';
import { createConverterObj } from './obj/create-converter-obj.js';

const srcPack: SrcPack = { s2t: [s2tChar, s2tPhrase], t2s: [t2sChar, t2sPhrase] };

const mConv = createConverterMap(srcPack);
const oConv = createConverterObj(srcPack);

const traditional = '余光中的餘光有著無限的情懷';
const simplified = '余光中的余光有着无限的情怀';

describe('Test mConv funtionality', () => {
  it('should convert simplified to traditional', () => {
    assert.equal(mConv.phrase(LangType.s2t, simplified), traditional);

    assert.equal(oConv.phrase(LangType.s2t, simplified), traditional);
  });

  it('should convert traditional to simplified', () => {
    assert.equal(mConv.phrase(LangType.t2s, traditional), simplified);
    assert.equal(oConv.phrase(LangType.t2s, traditional), simplified);
  });
});
