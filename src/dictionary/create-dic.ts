import { indexPackMap } from './map/index-pack-map.js';
import { indexPackObj } from './obj/index-pack-obj.js';
import { groupPack } from './shared/group-pack.js';
import type { IndexedPackMap, IndexedPackObj, SrcPack } from './type.js';

export const createDicObj = (src: SrcPack): IndexedPackObj => indexPackObj(groupPack(src));

export const createDicMap = (src: SrcPack): IndexedPackMap => indexPackMap(groupPack(src));
