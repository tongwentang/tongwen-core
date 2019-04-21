const isNotString = (v: unknown) => typeof v !== 'string';

const isEmptyString = (str: string) => str.trim() === '';

export const isEmpty = (v: unknown) => isNotString(v) || isEmptyString(v as string);
