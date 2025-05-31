import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
interface QuadrantDetail {
  title: string;
  description: string;
  features: string[];
  image: string;
}
const GutterQuadrantSection = () => {
  const {
    t
  } = useTranslation();
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  const quadrants: QuadrantDetail[] = [{
    title: t("Roof Assessment & Safety"),
    description: t("We start by carefully assessing the roof structure and setting up proper safety equipment before beginning any gutter work."),
    features: [t("Thorough roof inspection"), t("Ladder safety protocols"), t("Equipment positioning"), t("Weather condition assessment")],
    image: "/lovable-uploads/572f285b-b3cc-4a5c-93e3-637ee1015659.jpg"
  }, {
    title: t("Debris Removal Process"),
    description: t("Manual removal of all leaves, twigs, and accumulated debris from gutters and downspouts using professional tools."),
    features: [t("Hand removal of debris"), t("Specialized gutter tools"), t("Complete debris bagging"), t("Downspout inspection")],
    image: "/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png"
  }, {
    title: t("Water Flow Testing"),
    description: t("Testing water flow through the entire gutter system to ensure proper drainage and identify any blockages."),
    features: [t("Downspout flow testing"), t("Blockage identification"), t("Drainage assessment"), t("System functionality check")],
    image: "/lovable-uploads/17615bf7-9c4b-4eea-84a3-791bd34ef4a3.png"
  }, {
    title: t("Final Cleaning & Inspection"),
    description: t("Complete exterior gutter cleaning and final quality inspection to ensure everything meets our high standards."),
    features: [t("Gutter face cleaning"), t("Streak removal"), t("Final quality check"), t("Customer walkthrough")],
    image: "/lovable-uploads/063bab0f-d6c4-4c42-9610-0aa6307eae88.jpg"
  }];

  // Auto-rotate quadrants
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuadrant(prev => (prev + 1) % quadrants.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quadrants.length]);
  return;
};
export default GutterQuadrantSection;