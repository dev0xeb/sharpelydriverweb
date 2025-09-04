// Common form field configurations
export const vehicleManufacturers = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'bmw', label: 'BMW' },
  { value: 'audi', label: 'Audi' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'ford', label: 'Ford' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' }
];

export const vehicleModels = [
  { value: 'camry', label: 'Camry' },
  { value: 'corolla', label: 'Corolla' },
  { value: 'accord', label: 'Accord' },
  { value: 'civic', label: 'Civic' },
  { value: 'altima', label: 'Altima' },
  { value: 'sentra', label: 'Sentra' }
];

export const driverTypes = [
  { value: 'taxi', label: 'Taxi Driver' },
  { value: 'delivery', label: 'Delivery Driver' },
  { value: 'rideshare', label: 'Rideshare Driver' },
  { value: 'commercial', label: 'Commercial Driver' }
];

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Form field generators
export const createFormField = (placeholder: string, required: boolean = false) => ({
  placeholder,
  required
});

export const generateYearOptions = (startYear: number = 1990, endYear: number = new Date().getFullYear()) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};