import { TOperator, checkDic, convert, convertChar, initDic, isNil, mapOperator } from '../shared';
import { ITWCore, TWC_Dic, TWC_Map, TWC_RawDic, TWC_SortedMap, TWC_Target } from './interface';

export class TWCore_Map implements ITWCore {
  static createSync(rawDic: TWC_RawDic): TWCore_Map {
    return new TWCore_Map().initDic(rawDic);
  }

  protected dic: TWC_Dic<TWC_Map, TWC_SortedMap>;

  protected initDic({ s2t, t2s }: TWC_RawDic): TWCore_Map {
    if (isNil(this.dic)) {
      this.dic = initDic(mapOperator as TOperator, { s2t, t2s });
    }

    return this;
  }

  convertSync(text: string, target: TWC_Target): string {
    checkDic(this.dic);
    return convert(mapOperator as TOperator, this.dic, target, text);
  }

  convertCharSync(text: string, target: TWC_Target): string {
    checkDic(this.dic);

    return convertChar(mapOperator as TOperator, this.dic, target, text);
  }
}
