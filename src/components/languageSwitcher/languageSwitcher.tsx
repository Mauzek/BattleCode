import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, resetToSystemLanguage } from '@/store/slices/localeSlice';
import { useTranslation } from '@/hooks/localeHooks/useTranslation';
import type { RootState } from '@/store';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const { language, isSystemLanguage } = useSelector((state: RootState) => state.locale);
  const { systemLanguage } = useTranslation();

  const handleLanguageChange = (newLang: string) => {
    dispatch(setLanguage(newLang));
  };

  const handleSystemLanguage = () => {
    dispatch(resetToSystemLanguage());
  };

  return (
    <div className={styles["language-switcher"]}>
      <button
        onClick={() => handleLanguageChange('ru')}
        className={`${styles['language-btn']} ${language === 'ru' && !isSystemLanguage ? `${styles['active']}` : ''}`}
      >
        RU {language === 'ru' && isSystemLanguage && '🔄'}
      </button>
      
      <button
        onClick={() => handleLanguageChange('en')}
        className={`${styles['language-btn']} ${language === 'en' && !isSystemLanguage ? `${styles['active']}` : ''}`}
      >
        EN {language === 'en' && isSystemLanguage && '🔄'}
      </button>

      {!isSystemLanguage && (
        <button
          onClick={handleSystemLanguage}
          className={styles["system-btn"]}
          title={`Use system language (${systemLanguage.toUpperCase()})`}
        >
          🔄
        </button>
      )}
    </div>
  );
};