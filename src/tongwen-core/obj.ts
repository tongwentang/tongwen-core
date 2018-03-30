import { ITWCore, TWC_Dic, TWC_Obj, TWC_RawDic, TWC_SortedObj, TWC_Target } from './interface';

export class TWCore_Obj implements ITWCore {
  // static method for create TongWenCore instance
  static createSync(rawDic: TWC_RawDic<TWC_Obj>): TWCore_Obj {
    return new TWCore_Obj().initDic(rawDic);
  }

  static async create(rawDic: TWC_RawDic<TWC_Obj>): Promise<TWCore_Obj> {
    return this.createSync(rawDic);
  }

  // property
  protected dic: TWC_Dic<TWC_Obj, TWC_SortedObj>;

  // internal method
  protected initDic({ s2t, t2s }: TWC_RawDic<TWC_Obj>): TWCore_Obj {
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

  protected groupMap(map: TWC_Obj): { single: TWC_Obj; multi: TWC_Obj } {
    return Object.entries(map).reduce(
      (sum: { single: TWC_Obj; multi: TWC_Obj }, [key, value]) => {
        key.length > 1 ? (sum.multi[key] = value) : (sum.single[key] = value);
        return sum;
      },
      { single: {}, multi: {} },
    );
  }

  protected sortMulti(multi: TWC_Obj): TWC_SortedObj {
    return Object.entries(multi).reduce((sum: TWC_SortedObj, [key, value]) => {
      const indexKey = key.substring(0, 2);

      if (indexKey in sum) {
        sum[indexKey].map[key] = value;
        if (key.length > sum[indexKey].maxLength) {
          sum[indexKey].maxLength = key.length;
        }
      } else {
        sum[indexKey] = {
          maxLength: key.length,
          map: { [key]: value },
        };
      }

      return sum;
    }, {});
  }

  protected checkDic() {
    if (!this.dic) {
      throw new Error(
        'No available dictionaries, make sure create TongWenCore instance by TongWenCore.create!',
      );
    }
  }

  // public method
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

      if (index in multi) {
        let isFound = false;

        for (let currLength = multi[index].maxLength; currLength > 1; currLength--) {
          const toMap = text.substring(pointer, pointer + currLength);

          if (toMap in multi[index].map) {
            converted += multi[index].map[toMap];
            pointer += currLength;
            isFound = true;
            break;
          }
        }

        if (!isFound) {
          converted += single[text[pointer]] || text[pointer];
          pointer++;
        }
      } else {
        converted += single[text[pointer]] || text[pointer];
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
      converted += single[text[pointer]] || text[pointer];
      pointer++;
    }

    return converted;
  }

  async convertChar(text: string, target: TWC_Target): Promise<string> {
    return this.convertCharSync(text, target);
  }
}
