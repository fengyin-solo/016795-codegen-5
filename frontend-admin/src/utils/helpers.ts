import { LANGUAGES } from './constants';

// 生成唯一ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 无效时间的统一占位显示（本机时间异常或存储数据损坏时，所有入口展示一致）
const INVALID_TIME_TEXT = '--';

// 判断是否为有效时间：Invalid Date 一律走统一占位，不按正常时间格式化
const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !Number.isNaN(date.getTime());

// 格式化时间（时分秒）—— 所有时间展示的统一口径
export const formatTime = (date: Date): string => {
  if (!isValidDate(date)) return INVALID_TIME_TEXT;
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

// 格式化日期（年月日星期）—— 与 formatTime 同属一套口径，用于记录分组等场景
export const formatDate = (date: Date): string => {
  if (!isValidDate(date)) return INVALID_TIME_TEXT;
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

// 格式化日期时间（年月日星期 + 时分秒）—— 用于记录详情展示
export const formatDateTime = (date: Date): string => {
  if (!isValidDate(date)) return INVALID_TIME_TEXT;
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

// 延迟函数
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 模拟翻译API
export const mockTranslate = async (
  text: string,
  _sourceLang: string,
  _targetLang: string
): Promise<string> => {
  await delay(800 + Math.random() * 500);
  
  // 简单的模拟翻译逻辑
  const translations: Record<string, string> = {
    '你好': 'Hello',
    '世界': 'World',
    '翻译': 'Translation',
    '测试': 'Test',
    '系统': 'System',
  };
  
  let result = text;
  Object.entries(translations).forEach(([cn, en]) => {
    result = result.replace(new RegExp(cn, 'g'), en);
  });
  
  // 如果没有匹配，返回带标记的文本
  if (result === text) {
    result = `[Translated] ${text}`;
  }
  
  return result;
};

// 截断文本 —— 长文本展示的统一口径
// - 按码点（而非 UTF-16 码元）计数与截断，emoji 等代理对不会被从中间切开
// - 长度刚好等于 maxLength 时视为未超长，原样返回、不加省略号
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  const chars = Array.from(text);
  if (chars.length <= maxLength) return text;
  return `${chars.slice(0, maxLength).join('')}...`;
};

// 获取语言显示名称 —— 默认取自统一的 LANGUAGES 常量，保证全站同一份来源
export const getLanguageDisplayName = (
  code: string,
  languages: { code: string; nativeName: string }[] = LANGUAGES
): string => {
  const lang = languages.find(l => l.code === code);
  return lang?.nativeName || code;
};
