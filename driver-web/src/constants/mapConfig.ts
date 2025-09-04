export interface MapMarker {
  id: string;
  type: 'pickup' | 'dropoff' | 'current' | 'delivery';
  lat: number;
  lng: number;
  label?: string;
  color?: string;
}

export const DEFAULT_MAP_MARKERS: MapMarker[] = [
  {
    id: 'current-location',
    type: 'current',
    lat: 6.5244,
    lng: 3.3792,
    label: 'Your Location',
    color: '#3B82F6'
  }
];

export const RIDE_MAP_MARKERS: MapMarker[] = [
  ...DEFAULT_MAP_MARKERS,
  {
    id: 'pickup-victoria-island',
    type: 'pickup',
    lat: 6.4281,
    lng: 3.4219,
    label: 'Victoria Island Pickup',
    color: '#10B981'
  },
  {
    id: 'dropoff-ikeja',
    type: 'dropoff',
    lat: 6.6018,
    lng: 3.3515,
    label: 'Ikeja Dropoff',
    color: '#EF4444'
  }
];

export const DELIVERY_MAP_MARKERS: MapMarker[] = [
  ...DEFAULT_MAP_MARKERS,
  {
    id: 'delivery-pickup',
    type: 'pickup',
    lat: 6.4550,
    lng: 3.3841,
    label: 'Restaurant Pickup',
    color: '#F59E0B'
  },
  {
    id: 'delivery-dropoff',
    type: 'delivery',
    lat: 6.5355,
    lng: 3.3087,
    label: 'Customer Delivery',
    color: '#8B5CF6'
  }
];
