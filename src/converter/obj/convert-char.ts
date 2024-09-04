import type { DicObj, IndexedPairObj } from '../../dictionary/type.js';
import { isEmpty } from '../shared/is-empty.js';

const convert = (dic: DicObj, text: string) => {
  let converted = '';

  for (let pointer = 0; pointer < text.length; pointer++) {
    converted += dic[text[pointer]] || text[pointer];
  }

  return converted;
};

export const convertChar = ({ single }: IndexedPairObj, text: string) => (isEmpty(text) ? '' : convert(single, text));
