import icons from '../assets/icon';

export const SIDEBAR_ITEMS = [
  { icon: icons.Home, label: 'Home', active: true, href: '/dashboard', onClick: undefined },
  { icon: icons.Earn, label: 'Earn', active: false, href: '/earn-more', onClick: undefined },
  { icon: icons.History2, label: 'History', active: false, href: '/history', onClick: undefined },
  { icon: icons.profile, label: 'Profile', active: false, href: '/profile', onClick: undefined },
];

export const MAP_ROADS = [
  'M10,50 L90,50', 'M10,70 L90,70', 'M10,90 L90,90',
  'M50,10 L50,50', 'M70,10 L70,90', 'M30,50 L30,90',
];

export const MAP_BUILDINGS = [
  { x: 20, y: 30, width: 15, height: 15, color: '#94a3b8' },
  { x: 55, y: 25, width: 12, height: 20, color: '#64748b' },
  { x: 75, y: 35, width: 18, height: 12, color: '#94a3b8' },
  { x: 15, y: 55, width: 10, height: 10, color: '#64748b' },
  { x: 35, y: 60, width: 14, height: 14, color: '#94a3b8' },
  { x: 60, y: 75, width: 20, height: 8, color: '#64748b' },
  { x: 25, y: 75, width: 8, height: 12, color: '#94a3b8' },
];

export const BUSINESS_DISTRICTS = [
  { name: 'Downtown', x: 45, y: 35 },
  { name: 'Business District', x: 25, y: 75 },
];
