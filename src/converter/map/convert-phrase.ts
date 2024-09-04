import { IndexedPairMap } from '../../dictionary/type';
import { isEmpty } from '../shared/is-empty';

const convert = ({ single, multi }: IndexedPairMap, text: string) => {
  let converted = '';
  const textLength = text.length;

  for (let pointer = 0; pointer < textLength; pointer++) {
    const index = text.substring(pointer, pointer + 2);
    const indexed = multi.get(index);
    let isFound = false;

    if (indexed) {
      let sliceLength = Math.min(textLength - pointer, indexed.max);

      for (; sliceLength > 1; sliceLength--) {
        const toMap = text.substring(pointer, pointer + sliceLength);
        if (indexed.indies.has(toMap)) {
          converted += indexed.indies.get(toMap);
          pointer += sliceLength - 1;
          isFound = true;
          break;
        }
      }

      !isFound && (converted += single.get(text[pointer]) || text[pointer]);
    } else {
      converted += single.get(text[pointer]) || text[pointer];
    }
  }

  return converted;
};

export const convertPhrase = (pack: IndexedPairMap, text: string) => (isEmpty(text) ? '' : convert(pack, text));
