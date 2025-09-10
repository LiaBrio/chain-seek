"use client";

import { useState, useEffect } from 'react';
import { Language, detectUserLanguage, getTranslation, translations } from '@/lib/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 标记为客户端
    setIsClient(true);
    
    // 延迟执行以避免hydration错误
    const timer = setTimeout(() => {
      // 检查localStorage中是否有保存的语言偏好
      const savedLang = localStorage.getItem('preferred-language') as Language;
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      } else {
        // 检测用户语言
        const detectedLang = detectUserLanguage();
        setLanguage(detectedLang);
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (isClient) {
      localStorage.setItem('preferred-language', newLang);
    }
  };

  const t = (key: string) => getTranslation(language, key);

  return {
    language,
    changeLanguage,
    t,
    isLoading,
    isClient,
    availableLanguages: Object.keys(translations) as Language[]
  };
}
