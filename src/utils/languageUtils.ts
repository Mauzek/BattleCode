export const getSystemLanguage = () => {
  const browserLang = navigator.language || "en";

  const primaryLang = browserLang.split("-")[0].toLowerCase();

  const supportedLanguages = ["ru", "en"];

  return supportedLanguages.includes(primaryLang) ? primaryLang : "en";
};

export const getStoredLanguage = () => {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("app-language");
  if (stored) return stored;

  return getSystemLanguage();
};

export const setLanguageStorage = (lang: string) => {
  localStorage.setItem("app-language", lang);
};
