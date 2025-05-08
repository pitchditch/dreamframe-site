
import { useEffect } from 'react';
import { trackFormView, trackEvent } from '@/lib/analytics-client';

interface UseFormTrackingProps {
  formName: string;
  formData?: Record<string, any>;
}

const useFormTracking = ({ formName, formData = {} }: UseFormTrackingProps) => {
  // Track when the form is first viewed
  useEffect(() => {
    trackFormView(formName, formData);
  }, [formName, formData]);

  // Track form field interactions
  const trackFieldInteraction = (fieldName: string, interactionType: 'focus' | 'change' | 'blur' | 'click') => {
    trackEvent('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      interaction_type: interactionType
    });
  };

  // Track form steps
  const trackFormStep = (stepNumber: number, stepName: string) => {
    trackEvent('form_step', {
      form_name: formName,
      step_number: stepNumber,
      step_name: stepName
    });
  };

  // Track form submission
  const trackSubmission = (submissionData: Record<string, any> = {}) => {
    trackEvent('form_submission', {
      form_name: formName,
      ...submissionData,
      ...formData
    });
  };

  return {
    trackFieldInteraction,
    trackFormStep,
    trackSubmission
  };
};

export default useFormTracking;
