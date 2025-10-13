import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTranslations } from '@/store/slices/localeSlice';
import { getSystemLanguage } from '@/utils/languageUtils';
import type { RootState } from '@/store';

// Статически импортируем все файлы переводов
import ruTranslations from '@/locales/ru.json';
import enTranslations from '@/locales/en.json';
import type { Translations } from '@/types/locales';

// Объект со всеми переводами
const translationFiles: Record<string, Translations> = {
  ru: ruTranslations,
  en: enTranslations
};

export const useTranslation = () => {
  const dispatch = useDispatch();
  const { language, translations, isSystemLanguage } = useSelector((state: RootState) => state.locale);

  useEffect(() => {
    // Устанавливаем переводы для текущего языка
    const currentTranslations = translationFiles[language] || translationFiles.en;
    dispatch(setTranslations(currentTranslations));
  }, [language, dispatch]);

  const t = (key: string): string => {
    return (translations as Translations)[key]  || key;
  };

  const systemLanguage = getSystemLanguage();

  return { 
    t, 
    language, 
    isSystemLanguage,
    systemLanguage 
  };
};