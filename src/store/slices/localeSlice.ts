import { getStoredLanguage, getSystemLanguage, setLanguageStorage } from '@/utils/languageUtils';
import { createSlice } from '@reduxjs/toolkit';

const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    language: getStoredLanguage(),
    translations: {},
    isSystemLanguage: !localStorage.getItem('app-language') 
  },
  reducers: {
    setLanguage: (state, action) => {
      const newLang = action.payload;
      state.language = newLang;
      state.isSystemLanguage = false;
      setLanguageStorage(newLang);
    },
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },
    resetToSystemLanguage: (state) => {
      const systemLang = getSystemLanguage();
      state.language = systemLang;
      state.isSystemLanguage = true;
      localStorage.removeItem('app-language'); 
    }
  }
});

export const { setLanguage, setTranslations, resetToSystemLanguage } = localeSlice.actions;
export default localeSlice.reducer;