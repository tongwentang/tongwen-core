export const hasChinese = (text: string) => /[\u4e00-\u9fa5]/.test(text);
