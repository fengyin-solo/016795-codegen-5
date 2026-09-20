import { LANGUAGES, MAX_DISPLAY_TEXT_LENGTH } from './constants';

// 生成唯一ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const padTwoDigits = (value: number): string => String(value).padStart(2, '0');

// 格式化时间
export const formatTime = (date: Date): string => {
  return [
    padTwoDigits(date.getHours()),
    padTwoDigits(date.getMinutes()),
    padTwoDigits(date.getSeconds()),
  ].join(':');
};

const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

// 格式化日期
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${WEEKDAY_NAMES[date.getDay()]}`;
};

// 格式化日期和时间
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
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

// 截断文本
export const truncateText = (
  text: string,
  maxLength: number = MAX_DISPLAY_TEXT_LENGTH
): string => {
  const characters = Array.from(text);
  if (characters.length <= maxLength) return text;
  return characters.slice(0, maxLength).join('') + '...';
};

// 获取语言显示名称
export const getLanguageDisplayName = (
  code: string,
  languages: { code: string; nativeName: string }[] = LANGUAGES
): string => {
  const lang = languages.find(l => l.code === code);
  return lang?.nativeName || code;
};
