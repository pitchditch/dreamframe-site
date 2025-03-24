
import englishTranslations from './en';

export type Language = 'en';
export type TranslationKey = string;
export type TranslationMap = Record<TranslationKey, string>;
export type TranslationsType = Record<Language, TranslationMap>;

const translations: TranslationsType = {
  en: englishTranslations
};

export default translations;
