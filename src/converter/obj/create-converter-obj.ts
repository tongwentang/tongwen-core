import { createDicObj } from '../../dictionary/create-dic';
import { ConverterCreator, ConvertText, UpdateSource } from '../types';
import { convertChar } from './convert-char';
import { convertPhrase } from './convert-phrase';

export const createConverterObj: ConverterCreator = src => {
  let dic = createDicObj(src || { s2t: [], t2s: [] });

  const set: UpdateSource = src => ((dic = createDicObj(src)), undefined);

  const char: ConvertText = (type, text) => convertChar(dic[type], text);

  const phrase: ConvertText = (type, text) => convertPhrase(dic[type], text);

  return { set, char, phrase };
};
