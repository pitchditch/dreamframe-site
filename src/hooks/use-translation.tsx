
import { useContext } from 'react';
import { TranslationContext, TranslationContextType } from '../App';

// Export the hook with proper typing
export const useTranslation = (): TranslationContextType => useContext(TranslationContext);
