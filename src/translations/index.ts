
import englishTranslations from './en';
import * as punjabiTranslations from './pa';

export type Language = 'en' | 'pa';
export type TranslationKey = string;
export type TranslationMap = Record<TranslationKey, string>;
export type TranslationsType = Record<Language, TranslationMap>;

const translations: TranslationsType = {
  en: englishTranslations,
  pa: punjabiTranslations.default || punjabiTranslations
};

export default translations;
