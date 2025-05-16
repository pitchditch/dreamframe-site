
import { useContext } from 'react';
import { TranslationContext } from '../App';

export const useTranslation = () => useContext(TranslationContext);
