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
  subtitle?: string; // Added subtitle prop
  faqs: FAQ[];
}
const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  description,
  subtitle,
  faqs = []
}) => {
  return;
};
export default FAQSection;