import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
interface FAQ {
  question: string;
  answer: string;
}
interface FAQSectionProps {
  title?: string;
  description?: string;
  subtitle?: string;
  faqs: FAQ[];
  darkMode?: boolean;
}
const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  description,
  subtitle,
  faqs = [],
  darkMode = false
}) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const accentColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  return;
};
export default FAQSection;