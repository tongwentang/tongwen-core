import { createDicObj } from '../../dictionary/create-dic';
import { LangType, SrcPack } from '../../dictionary/type';
import { convertChar } from './convert-char';
import { convertPhrase } from './convert-phrase';

export const createConveterObj = (src: SrcPack) => {
  let dic = createDicObj(src || { s2t: [], t2s: [] });

  const set = (src: SrcPack) => ((dic = createDicObj(src)), undefined);

  const char = (type: LangType, text: string) => convertChar(dic[type], text);

  const phrase = (type: LangType, text: string) => convertPhrase(dic[type], text);

  return { set, char, phrase };
};
