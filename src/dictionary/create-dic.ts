import { indexPackMap } from './map/index-pack-map';
import { indexPackObj } from './obj/index-pack-obj';
import { groupPack } from './shared/group-pack';
import { IndexedPackMap, IndexedPackObj, SrcPack } from './type';

export const createDicObj = (src: SrcPack): IndexedPackObj => indexPackObj(groupPack(src));

export const createDicMap = (src: SrcPack): IndexedPackMap => indexPackMap(groupPack(src));
