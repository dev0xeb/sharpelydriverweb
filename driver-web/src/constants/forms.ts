export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'file' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon: string;
  type: 'card' | 'bank' | 'wallet';
}

export const COMPANY_DRIVER_FORM_FIELDS: FormFieldConfig[] = [
  { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Enter company name', required: true },
  { name: 'driverName', label: 'Driver Name', type: 'text', placeholder: 'Enter driver name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter email address', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number', required: true },
  { name: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter license number', required: true }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'Cash', label: 'Cash', icon: '💵', type: 'card' },
  { id: 'Sharperly wallet', label: 'Sharperly wallet', icon: '💳', type: 'wallet' },
  { id: 'Bank Transfer', label: 'Bank Transfer', icon: '🏦', type: 'bank' }
];

export interface PriceRange {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  currency: string;
}

export const RIDE_PRICE_RANGES: PriceRange[] = [
  {
    id: '2-3',
    label: ' 2k/m - 3 k/m',
    description: 'E.g Rumuigbo - Rumuokwuta ',
    basePrice: 1000,
    currency: 'NGN'
  },
  {
    id: '3-6',
    label: '3k/m - 6k/m',
    description: 'E.g RSU - Ogbunabali ',
    basePrice: 1500,
    currency: 'NGN'
  },
  {
    id: '6-9',
    label: '6k/m - 9 k/m',
    description: 'E.g RSU -  Rumuigbo ',
    basePrice: 2000,
    currency: 'NGN'
  },
  {
    id: '9-12',
    label: '9k/m - 12k/m',
    description: 'E.g Iwofe rd -  Rumuigbo',
    basePrice: 2000,
    currency: 'NGN'
  },
  {
    id: '12-15',
    label: '12k/m - 15k/m',
    description: 'E.g RSU -  Borokiri ',
    basePrice: 2000,
    currency: 'NGN'
  },
  {
    id: '15-20',
    label: '15k/m - 20k/m',
    description: 'E.g RSU -  Uniport ',
    basePrice: 2000,
    currency: 'NGN'
  },
  {
    id: '20-25',
    label: '20k/m - 25k/m',
    description: 'E.g RSU -  Alu ',
    basePrice: 2000,
    currency: 'NGN'
  },
  {
    id: '25-30',
    label: '25k/m - 30k/m',
    description: 'E.g RSU -  Oyibo ',
    basePrice: 2000,
    currency: 'NGN'
  }
];
