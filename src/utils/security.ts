
interface SubmissionRecord {
  timestamp: number;
  count: number;
}

export class RateLimiter {
  private static getKey(identifier: string): string {
    return `rate_limit_${identifier}`;
  }

  static canSubmit(identifier: string, maxSubmissions = 3, windowMinutes = 15): boolean {
    try {
      const key = this.getKey(identifier);
      const stored = localStorage.getItem(key);
      const now = Date.now();
      const windowMs = windowMinutes * 60 * 1000;

      if (!stored) {
        const record: SubmissionRecord = { timestamp: now, count: 1 };
        localStorage.setItem(key, JSON.stringify(record));
        return true;
      }

      const record: SubmissionRecord = JSON.parse(stored);
      
      // Reset if window has expired
      if (now - record.timestamp > windowMs) {
        const newRecord: SubmissionRecord = { timestamp: now, count: 1 };
        localStorage.setItem(key, JSON.stringify(newRecord));
        return true;
      }

      // Check if limit exceeded
      if (record.count >= maxSubmissions) {
        return false;
      }

      // Increment count
      record.count++;
      localStorage.setItem(key, JSON.stringify(record));
      return true;
    } catch (error) {
      console.error('Rate limiting error:', error);
      return true; // Allow on error to prevent blocking legitimate users
    }
  }

  static getRemainingTime(identifier: string, windowMinutes = 15): number {
    try {
      const key = this.getKey(identifier);
      const stored = localStorage.getItem(key);
      
      if (!stored) return 0;
      
      const record: SubmissionRecord = JSON.parse(stored);
      const windowMs = windowMinutes * 60 * 1000;
      const elapsed = Date.now() - record.timestamp;
      
      return Math.max(0, windowMs - elapsed);
    } catch (error) {
      return 0;
    }
  }
}

export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Basic XSS prevention
      sanitized[key] = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

export const createHoneypot = (): JSX.Element => {
  return (
    <div style={{ display: 'none' }}>
      <input 
        type="text" 
        name="website_url" 
        tabIndex={-1} 
        autoComplete="off"
        aria-hidden="true"
      />
    </div>
  );
};

export const detectBot = (formData: FormData): boolean => {
  // Check honeypot field
  const honeypot = formData.get('website_url');
  if (honeypot && honeypot.toString().trim() !== '') {
    return true;
  }
  
  return false;
};

export const sanitizeLogData = (data: Record<string, any>): Record<string, any> => {
  const sensitiveFields = ['email', 'phone', 'phoneNumber', 'address', 'message', 'additionalNotes'];
  const sanitized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
};
