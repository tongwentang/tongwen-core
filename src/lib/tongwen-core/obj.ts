import {
  TOperator,
  checkDic,
  convert,
  convertChar,
  initDic,
  isNil,
  objectOperator,
} from '../shared';
import { ITWCore, TWC_Dic, TWC_Obj, TWC_RawDic, TWC_SortedObj, TWC_Target } from './interface';

export class TWCore_Obj implements ITWCore {
  // static method for create TongWenCore instance
  static createSync(rawDic: TWC_RawDic): TWCore_Obj {
    return new TWCore_Obj().initDic(rawDic);
  }

  // property
  protected dic: TWC_Dic<TWC_Obj, TWC_SortedObj>;

  // internal method
  protected initDic({ s2t, t2s }: TWC_RawDic): TWCore_Obj {
    if (isNil(this.dic)) {
      this.dic = initDic(objectOperator as TOperator, { s2t, t2s });
    }

    return this;
  }

  convertSync(text: string, target: TWC_Target): string {
    checkDic(this.dic);
    return convert(objectOperator as TOperator, this.dic, target, text);
  }

  convertCharSync(text: string, target: TWC_Target): string {
    checkDic(this.dic);

    return convertChar(objectOperator as TOperator, this.dic, target, text);
  }
}
