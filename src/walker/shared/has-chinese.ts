/**
 * @deprecated will remove on next major version v5.0.0
 */
export const hasChinese = (text: string) => /[\u4e00-\u9fa5]/.test(text);
