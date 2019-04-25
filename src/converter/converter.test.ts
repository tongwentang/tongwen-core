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
    expect(mConv.phrase(LangType.s2t, simplified)).toBe(traditional);

    expect(oConv.phrase(LangType.s2t, simplified)).toBe(traditional);
  });

  it('should convert traditional to simplified', () => {
    expect(mConv.phrase(LangType.t2s, traditional)).toBe(simplified);
    expect(oConv.phrase(LangType.t2s, traditional)).toBe(simplified);
  });
});
