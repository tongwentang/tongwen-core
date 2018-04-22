import { ITWCore, TWC_Dic, TWC_Map, TWC_Obj, TWC_RawDic, TWC_SortedMap, TWC_SortedMapData, TWC_Target } from './interface';

export class TWCore_Map implements ITWCore {
  static createSync(rawDic: TWC_RawDic<TWC_Obj>): TWCore_Map {
    return new TWCore_Map().initDic(rawDic);
  }

  static async create(rawDic: TWC_RawDic<TWC_Obj>): Promise<TWCore_Map> {
    return this.createSync(rawDic);
  }

  protected dic: TWC_Dic<TWC_Map, TWC_SortedMap>;

  protected initDic({ s2t, t2s }: TWC_RawDic<TWC_Obj>): TWCore_Map {
    if (!this.dic) {
      const { single: s2tSingle, multi: s2tMulti } = this.groupMap(s2t);
      const { single: t2sSingle, multi: t2sMulti } = this.groupMap(t2s);

      this.dic = {
        s2t: { single: s2tSingle, multi: this.sortMulti(s2tMulti) },
        t2s: { single: t2sSingle, multi: this.sortMulti(t2sMulti) },
      };
    }

    return this;
  }

  protected groupMap(map: TWC_Obj): { single: TWC_Map; multi: TWC_Map } {
    return Object.entries(map).reduce(
      (sum: { single: TWC_Map; multi: TWC_Map }, [key, value]) => {
        key.length > 1 ? sum.multi.set(key, value) : sum.single.set(key, value);
        return sum;
      },
      { single: new Map(), multi: new Map() },
    );
  }

  protected sortMulti(multi: TWC_Map): TWC_SortedMap {
    return Array.from(multi.entries()).reduce((sum: TWC_SortedMap, [key, value]) => {
      const indexKey = key.substring(0, 2);

      if (sum.has(indexKey)) {
        const data = sum.get(indexKey) as TWC_SortedMapData;
        data.map.set(indexKey, value);

        if (key.length > data.maxLength) {
          data.maxLength = key.length;
        }
      } else {
        sum.set(indexKey, { maxLength: key.length, map: new Map([[key, value]]) });
      }

      return sum;
    }, new Map());
  }

  protected checkDic() {
    if (!this.dic) {
      throw new Error('No available dictionaries, make sure create TongWenCore instance by');
    }
  }

  convertSync(text: string, target: TWC_Target): string {
    this.checkDic();

    if (text.trim() === '') {
      return text;
    }

    let converted = '';
    let pointer = 0;
    const textLength = text.length;
    const { single, multi } = this.dic[target];

    while (pointer < textLength) {
      const index = text.substring(pointer, pointer + 2);

      if (multi.has(index)) {
        let isFound = false;
        let currLength = (multi.get(index) as TWC_SortedMapData).maxLength;
        const map = (multi.get(index) as TWC_SortedMapData).map;

        for (; currLength > 1; currLength--) {
          const toMap = text.substring(pointer, pointer + currLength);

          if (map.has(toMap)) {
            converted += map.get(toMap);
            pointer += currLength;
            isFound = true;
            break;
          }
        }

        if (!isFound) {
          converted += single.get(text[pointer]) || text[pointer];
          pointer++;
        }
      } else {
        converted += single.get(text[pointer]) || text[pointer];
        pointer++;
      }
    }

    return converted;
  }

  async convert(text: string, target: TWC_Target): Promise<string> {
    return this.convertSync(text, target);
  }

  convertCharSync(text: string, target: TWC_Target): string {
    this.checkDic();

    if (!text.trim()) {
      return text;
    }

    const { single } = this.dic[target];
    const length = text.length;
    let pointer = 0;
    let converted = '';

    while (pointer < length) {
      converted += single.get(text[pointer]) || text[pointer];
      pointer++;
    }

    return converted;
  }

  async convertChar(text: string, target: TWC_Target): Promise<string> {
    return this.convertCharSync(text, target);
  }
}
