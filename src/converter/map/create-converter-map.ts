import { createDicMap } from '../../dictionary/create-dic';
import { ConverterCreator, ConvertText, UpdateSource } from '../types';
import { convertChar } from './convert-char';
import { convertPhrase } from './convert-phrase';

export const createConverterMap: ConverterCreator = src => {
  let dic = createDicMap(src || { s2t: [], t2s: [] });

  const set: UpdateSource = src => ((dic = createDicMap(src)), undefined);

  const char: ConvertText = (type, text) => convertChar(dic[type], text);

  const phrase: ConvertText = (type, text) => convertPhrase(dic[type], text);

  return { set, char, phrase };
};
