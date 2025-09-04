// Icon placeholders as strings to avoid external dependency
const Home = 'home';
const MapPin = 'map-pin';
const Settings = 'settings';
const User = 'user';
const Shield = 'shield';
const Package = 'package';
const FileText = 'file-text';

export interface NavigationItem {
  icon: any;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export const SIDEBAR_ITEMS: NavigationItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: MapPin, label: 'Rides', href: '/rides' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

// Legacy sidebar items for components using string icons
export const LEGACY_SIDEBAR_ITEMS = [
  { icon: '🏠', label: 'Dashboard', active: true, onClick: undefined },
  { icon: '🚗', label: 'Rides', active: false, onClick: undefined },
  { icon: '👤', label: 'Profile', active: false, onClick: undefined },
  { icon: '⚙️', label: 'Settings', active: false, onClick: undefined },
];

export const DELIVERY_SIDEBAR_ITEMS: NavigationItem[] = [
  { icon: Home, label: 'Dashboard', href: '/delivery-dashboard', active: true },
  { icon: Package, label: 'Deliveries', href: '/deliveries' },
  { icon: MapPin, label: 'Tracking', href: '/tracking' },
  { icon: FileText, label: 'History', href: '/history' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const SAFETY_SIDEBAR_ITEMS: NavigationItem[] = [
  { icon: Shield, label: 'Safety Center', href: '/safety', active: true },
  { icon: MapPin, label: 'Emergency', href: '/emergency' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];
