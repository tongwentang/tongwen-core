import {
  TWC_Dic,
  TWC_Map,
  TWC_Obj,
  TWC_RawDic,
  TWC_SortedData,
  TWC_SortedMap,
  TWC_SortedObj,
  TWC_Target,
} from '../tongwen-core/interface';

export const isEmptyString = (text: string) => text.trim() === '';

export const isNil = (test: any) => test == null;

export type TOperator = {
  create: <V>() => MapLike<V> | ObjectLike<V>;
  entries: <V>(map: MapLike<V> | ObjectLike<V>) => [string, V][];
  has: <V>(map: MapLike<V> | ObjectLike<V>, key: string) => boolean;
  get: <V>(map: MapLike<V> | ObjectLike<V>, key: string) => V;
  set: <V>(map: MapLike<V> | ObjectLike<V>, key: string, value: V) => any;
};

export type MapLike<V> = Map<string, V>;
export const mapOperator = {
  create: <V>(): MapLike<V> => new Map(),
  entries: <V>(map: MapLike<V>): [string, V][] => Array.from(map.entries()),
  has: <V>(map: MapLike<V>, key: string): boolean => map.has(key),
  get: <V>(map: MapLike<V>, key: string): V => map.get(key) as V,
  set: <V>(map: MapLike<V>, key: string, value: V) => map.set(key, value),
};

export type ObjectLike<V> = { [key: string]: V };
export const objectOperator = {
  create: <V>(): ObjectLike<V> => ({}),
  entries: <V>(obj: ObjectLike<V>): [string, V][] => Object.entries(obj),
  has: <V>(obj: ObjectLike<V>, key: string): boolean => !isNil(obj[key]),
  get: <V>(obj: ObjectLike<V>, key: string): V => obj[key],
  set: <V>(obj: ObjectLike<V>, key: string, value: V) => (obj[key] = value),
};

const isMap = box => box instanceof Map;

export const checkDic = (dic: TWC_Dic<any, any>) => {
  if (isNil(dic))
    throw new Error('No available dictionary, make sure create instance use static method.');
};

/* group map utilities */
interface GroupMap<T> {
  single: T;
  multi: T;
}
function getGroupMap<T extends TWC_Map | TWC_Obj>(
  operator: TOperator,
  map: TWC_Obj,
  groupMap: GroupMap<T>,
): GroupMap<T> {
  return Object.entries(map).reduce((sum, [key, value]) => {
    operator.set(key.length > 1 ? sum.multi : sum.single, key, value);
    return sum;
  }, groupMap);
}
/* group map utitlites end */

/* sort multi utilities */
function sortMulti<T extends TWC_Map | TWC_Obj, U extends TWC_SortedMap | TWC_SortedObj>(
  operator: TOperator,
  multi: T,
  sorted: U,
): U {
  return operator.entries(multi).reduce((sum, [key, value]) => {
    const indexKey = key.substring(0, 2);

    if (operator.has(sum, indexKey)) {
      const data = operator.get<TWC_SortedData<TWC_Map | TWC_Obj>>(sum, indexKey);
      operator.set(data.map, key, value);
      if (key.length > data.maxLength) {
        data.maxLength = key.length;
      }
    } else {
      const map = operator.create();
      operator.set(map, key, value);
      operator.set(sum, indexKey, { maxLength: key.length, map });
    }

    return sum;
  }, sorted);
}
/* sort multi utilities end */

/* initialize dictionary start */
export function initDic<T extends TWC_Map | TWC_Obj, U extends TWC_SortedMap | TWC_SortedObj>(
  operator: TOperator,
  { s2t, t2s }: TWC_RawDic,
): TWC_Dic<T, U> {
  const { single: s2tSingle, multi: s2tMulti } = getGroupMap(operator, s2t, {
    single: operator.create() as T,
    multi: operator.create() as T,
  });
  const { single: t2sSingle, multi: t2sMulti } = getGroupMap(operator, t2s, {
    single: operator.create() as T,
    multi: operator.create() as T,
  });

  return {
    s2t: { single: s2tSingle, multi: sortMulti(operator, s2tMulti, operator.create() as U) },
    t2s: { single: t2sSingle, multi: sortMulti(operator, t2sMulti, operator.create() as U) },
  };
}
/* initialize dictionary end */

/* convert function */
export function convert<T extends TWC_Map | TWC_Obj, U extends TWC_SortedMap | TWC_SortedObj>(
  operator: TOperator,
  dic: TWC_Dic<T, U>,
  target: TWC_Target,
  text: string,
): string {
  if (isEmptyString(text)) {
    return text;
  }

  let converted = '';
  let pointer = 0;
  const textLength = text.length;
  const { single, multi } = dic[target];

  while (pointer < textLength) {
    const index = text.substring(pointer, pointer + 2);

    if (operator.has(multi, index)) {
      const sortedData = operator.get<TWC_SortedData<TWC_Map | TWC_Obj>>(multi, index);
      let isFound = false;

      for (let currLength = sortedData.maxLength; currLength > 1; currLength--) {
        const toMap = text.substring(pointer, pointer + currLength);

        if (operator.has(sortedData.map, toMap)) {
          converted += operator.get(sortedData.map, toMap);
          pointer += currLength;
          isFound = true;
          break;
        }
      }

      if (!isFound) {
        converted += operator.get<string>(single, text[pointer]) || text[pointer];
        pointer++;
      }
    } else {
      converted += operator.get<string>(single, text[pointer]) || text[pointer];
      pointer++;
    }
  }

  return converted;
}

export function convertChar<T extends TWC_Map | TWC_Obj, U extends TWC_SortedMap | TWC_SortedObj>(
  operator: TOperator,
  dic: TWC_Dic<T, U>,
  target: TWC_Target,
  text: string,
): string {
  if (isEmptyString(text)) {
    return text;
  }

  let converted = '';
  let pointer = 0;
  const textLength = text.length;
  const { single } = dic[target];

  while (pointer < length) {
    converted += operator.get<string>(single, text[pointer]) || text[pointer];
    pointer++;
  }

  return converted;
}
/* convert function end */
