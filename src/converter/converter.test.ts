import assert from 'node:assert';
import { describe, it } from 'node:test';
import { LangType, SrcPack } from '../dictionary/type';
import { createConverterMap } from './map';
import { createConverterObj } from './obj/create-converter-obj';

const s2tChar = require('../../dictionaries/s2t-char.json');
const s2tPhrase = require('../../dictionaries/s2t-phrase.json');
const t2sChar = require('../../dictionaries/t2s-char.json');
const t2sPhrase = require('../../dictionaries/t2s-phrase.json');

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
