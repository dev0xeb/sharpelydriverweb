// Icon placeholders as strings to avoid external dependency
const Shield = 'shield';
const Phone = 'phone';
const AlertTriangle = 'alert-triangle';
const Eye = 'eye';
const MapPin = 'map-pin';
const Users = 'users';

export interface SafetyFeature {
  id: string;
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  bgColor: string;
  iconColor: string;
}

export const SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: 'emergency-button',
    icon: AlertTriangle,
    title: 'Emergency Button',
    description: 'Quick access to emergency services',
    enabled: true,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    id: 'share-trip',
    icon: Users,
    title: 'Share Trip',
    description: 'Share your live location with trusted contacts',
    enabled: true,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 'trip-monitoring',
    icon: Eye,
    title: 'Trip Monitoring',
    description: '24/7 trip monitoring and alerts',
    enabled: true,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    id: 'emergency-contacts',
    icon: Phone,
    title: 'Emergency Contacts',
    description: 'Quick dial to emergency contacts',
    enabled: false,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    id: 'safe-pickup',
    icon: MapPin,
    title: 'Safe Pickup Points',
    description: 'Verified safe pickup and drop-off locations',
    enabled: true,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  }
];

export const SAFETY_MENU_ITEMS = [
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    description: 'Manage your emergency contacts',
    icon: Phone,
    href: '/safety/contacts'
  },
  {
    id: 'safety-settings',
    title: 'Safety Settings',
    description: 'Configure safety preferences',
    icon: Shield,
    href: '/safety/settings'
  }
];
