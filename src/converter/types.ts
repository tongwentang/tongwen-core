import { LangType, type SrcPack } from '../dictionary/type.js';

export type UpdateSource = (src: SrcPack) => void;

export type ConvertText = (type: LangType, text: string) => string;

export type Converter = { set: UpdateSource; char: ConvertText; phrase: ConvertText };

export type ConverterCreator = (src: SrcPack) => Converter;
