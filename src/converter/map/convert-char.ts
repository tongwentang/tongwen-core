import { DicMap, IndexedPairMap } from '../../dictionary/type';
import { isEmpty } from '../shared/is-empty';

const convert = (dic: DicMap, text: string) => {
  let converted = '';

  for (let pointer = 0; pointer < text.length; pointer++) {
    converted += dic.get(text[pointer]) || text[pointer];
  }

  return converted;
};

export const convertChar = ({ single }: IndexedPairMap, text: string) => (isEmpty(text) ? '' : convert(single, text));
