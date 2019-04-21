import { targetAttrs } from './constant';

export const extractAttrText = (elm: HTMLElement) =>
  targetAttrs.reduce(
    (col, attr) => {
      col.push([attr, elm.getAttribute(attr)!]);
      return col;
    },
    [] as [string, string][],
  );
