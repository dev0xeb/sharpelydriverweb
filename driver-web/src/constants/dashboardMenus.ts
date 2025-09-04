import icons from '../assets/icon';

export interface MenuItemConfig {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  href?: string;
}

export const INDIVIDUAL_DASHBOARD_MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'start-ride',
    icon: icons.Analytics,
    title: 'Ride Analytics',
    subtitle: 'Track both income and ride analysis',
    href: '/analysis'
  },
  {
    id: 'earnings',
    icon: icons.History,
    title: 'Scheduled Rides',
    subtitle: 'Accept scheduled rides to earn more',
    href: '/scheduled-rides'
  },
  {
    id: 'ride-history',
    icon: icons.Task,
    title: 'Delivery Tasks',
    subtitle: 'Only available for company riders only. Request to be  be a company rider',
    href: '/history'
  },
  {
    id: 'ratings',
    icon: icons.wallet,
    title: 'Wallet',
    subtitle: 'Check balance and make transactions here',
    href: '/wallet/passcode'
  },
  {
    id: 'performance',
    icon: icons.target,
    title: 'Set Target',
    subtitle: 'Earn more by setting daring target',
    href: '/set-target'
  },
  {
    id: 'riders',
    icon: icons.Refer,
    title: 'Refer a Friend',
    subtitle: 'Get 50% discount off your returns to sharperly by inviting a friend to drive with you',
    href: '/riders'
  }
];

export const DELIVERY_DASHBOARD_MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'analytics',
    icon: icons.Analytics,
    title: 'Delivery Analytics',
    subtitle: 'Track both income and delivery analysis',
    href: '/analysis'
  },
  {
    id: 'scheduled',
    icon: icons.History,
    title: 'Scheduled Deliveries',
    subtitle: 'Accept scheduled deliveries to earn more',
    href: '/scheduled-rides'
  },
  {
    id: 'tasks',
    icon: icons.Task,
    title: 'Delivery Tasks',
    subtitle: 'See all your delivery tasks here',
    href: '/dispatch-cancelled'
  },
  {
    id: 'wallet',
    icon: icons.wallet,
    title: 'Wallet',
    subtitle: 'Check balance and make transactions here',
    href: '/wallet/passcode'
  },
  {
    id: 'performance',
    icon: icons.target,
    title: 'Set Target',
    subtitle: 'Earn more by setting daring target',
    href: '/set-target'
  },
  {
    id: 'refer',
    icon: icons.Refer,
    title: 'Refer A Friend',
    subtitle: 'Get 50% discount off your returns to sharperly by inviting a friend to drive with you',
    href: '/profile/invite'
  }
];
