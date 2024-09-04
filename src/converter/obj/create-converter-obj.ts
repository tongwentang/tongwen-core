import { createDicObj } from '../../dictionary/create-dic.js';
import type { ConverterCreator, ConvertText, UpdateSource } from '../types.js';
import { convertChar } from './convert-char.js';
import { convertPhrase } from './convert-phrase.js';

export const createConverterObj: ConverterCreator = src => {
  let dic = createDicObj(src || { s2t: [], t2s: [] });

  const set: UpdateSource = src => ((dic = createDicObj(src)), undefined);

  const char: ConvertText = (type, text) => convertChar(dic[type], text);

  const phrase: ConvertText = (type, text) => convertPhrase(dic[type], text);

  return { set, char, phrase };
};
