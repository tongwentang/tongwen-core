import { ConvertTarget, Core_BaseDic, Core_Map, Core_RawGroupDic, Core_SortedMap, Core_SortGroupDic } from './interface';

export class TongWenCore {
  // static method for create TongWenCore instance
  static async create(rawGroupDic: Core_RawGroupDic): Promise<TongWenCore> {
    return this.createSync(rawGroupDic);
  }

  static createSync(rawGroupDic: Core_RawGroupDic): TongWenCore {
    return new TongWenCore().initDic(rawGroupDic);
  }

  // property
  protected sortGroupDic: Core_SortGroupDic;

  // internal method
  protected initDic({ s2t, t2s }: Core_RawGroupDic): TongWenCore {
    if (!this.sortGroupDic) {
      const aligned: Core_RawGroupDic = {
        s2t: { ...this.alignMaps(s2t) },
        t2s: { ...this.alignMaps(t2s) },
      };

      this.sortGroupDic = {
        s2t: {
          ...aligned.s2t,
          sortedPhrase: this.sortPhrases(aligned.s2t.phrase),
        },
        t2s: {
          ...aligned.t2s,
          sortedPhrase: this.sortPhrases(aligned.t2s.phrase),
        },
      };
    }

    return this;
  }

  protected alignMaps(baseDir: Core_BaseDic): Core_BaseDic {
    const { single: charSingle, multi: charMulti } = this.groupMap(baseDir.char);
    const { single: phraseSingle, multi: phraseMulti } = this.groupMap(baseDir.phrase);

    return {
      char: { ...charSingle, ...phraseSingle },
      phrase: { ...charMulti, ...phraseMulti },
    };
  }

  protected groupMap(map: Core_Map) {
    return Object.entries(map).reduce(
      (sum: { single: Core_Map; multi: Core_Map }, [key, value]) => {
        key.length > 1 ? (sum.multi[key] = value) : (sum.single[key] = value);
        return sum;
      },
      { single: {}, multi: {} },
    );
  }

  protected sortPhrases(phrases: Core_Map): Core_SortedMap {
    return Object.entries(phrases).reduce((sum: Core_SortedMap, [key, value]) => {
      const indexKey = key.substring(0, 2);

      if (indexKey in sum) {
        sum[indexKey].mappings[key] = value;
        if (key.length > sum[indexKey].maxLength) {
          sum[indexKey].maxLength = key.length;
        }
      } else {
        sum[indexKey] = {
          maxLength: key.length,
          mappings: { [key]: value },
        };
      }

      return sum;
    }, {});
  }

  protected checkDics() {
    if (!this.sortGroupDic) {
      throw new Error(
        'No available dictionary, make sure create TongWenCore instance by TongWenCore.create!',
      );
    }
  }

  // public method
  convertSync(text: string, target: ConvertTarget): string {
    this.checkDics();

    if (text.trim() === '') {
      return text;
    }

    let converted = '';
    let pointer = 0;
    const toConvertLength = text.length;
    const { char, sortedPhrase } = this.sortGroupDic[target];

    while (pointer < toConvertLength) {
      const index = text.substring(pointer, pointer + 2);

      if (index in sortedPhrase) {
        for (let currLength = sortedPhrase[index].maxLength; currLength > 1; currLength--) {
          const toMap = text.substring(pointer, pointer + currLength);

          if (toMap in sortedPhrase[index].mappings) {
            converted += sortedPhrase[index].mappings[toMap];
            pointer += currLength;
            break;
          }
        }
      } else {
        converted += char[text[pointer]] || text[pointer];
        pointer++;
      }
    }

    return converted;
  }

  async convert(text: string, target: ConvertTarget): Promise<string> {
    return this.convertSync(text, target);
  }

  convertCharSync(text: string, target: ConvertTarget): string {
    this.checkDics();

    if (!text.trim()) {
      return text;
    }

    const { char } = this.sortGroupDic[target];
    const length = text.length;
    let pointer = 0;
    let converted = '';

    while (pointer < length) {
      converted += char[text[pointer]] || text[pointer];
      pointer++;
    }

    return converted;
  }

  async convertChar(text: string, target: ConvertTarget): Promise<string> {
    return this.convertCharSync(text, target);
  }
}
