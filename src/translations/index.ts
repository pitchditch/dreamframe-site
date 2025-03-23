
import englishTranslations from './en';
import punjabiTranslations from './pa';

export type Language = 'en' | 'pa';
export type TranslationKey = string;
export type TranslationMap = Record<TranslationKey, string>;
export type TranslationsType = Record<Language, TranslationMap>;

const translations: TranslationsType = {
  en: englishTranslations,
  pa: punjabiTranslations
};

export default translations;

