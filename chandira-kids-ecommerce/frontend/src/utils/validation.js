export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

export const validateMinLength = (value, min) => {
  return value && value.length >= min;
};

export const validateMaxLength = (value, max) => {
  return value && value.length <= max;
};

export const validateNumber = (value) => {
  return !isNaN(value) && value !== '';
};

export const validateMin = (value, min) => {
  return Number(value) >= min;
};

export const validateMax = (value, max) => {
  return Number(value) <= max;
};

export const validateSriLankanPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('94')) {
    return cleaned.length === 11 && cleaned.startsWith('947');
  }
  return cleaned.length === 10 && cleaned.startsWith('0');
};

export const getErrorMessage = (field, type, value) => {
  const errors = {
    email: validateEmail(value) ? '' : 'Please enter a valid email address',
    phone: validateSriLankanPhone(value) ? '' : 'Please enter a valid Sri Lankan phone number (e.g., 0771234567)',
    password: validatePassword(value) ? '' : 'Password must be at least 6 characters',
    required: validateRequired(value) ? '' : 'This field is required',
    minLength: validateMinLength(value, type) ? '' : `Must be at least ${type} characters`,
    maxLength: validateMaxLength(value, type) ? '' : `Must be no more than ${type} characters`,
    number: validateNumber(value) ? '' : 'Please enter a valid number',
    min: validateMin(value, type) ? '' : `Must be at least ${type}`,
    max: validateMax(value, type) ? '' : `Must be no more than ${type}`
  };
  return errors[field] || '';
};

export const validateForm = (fields, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = fields[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      if (typeof rule === 'string') {
        const error = getErrorMessage(field, rule, value);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      } else if (typeof rule === 'function') {
        const error = rule(value);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      } else if (typeof rule === 'object') {
        const { type, param, customMessage } = rule;
        const error = customMessage || getErrorMessage(type, param, value);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    });
  });

  return { isValid, errors };
};
