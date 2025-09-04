export interface Marker {
  id: string;
  x: number;
  y: number;
  icon: string;
  color: string;
  size?: number;
  label?: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
}

// Common marker types for different use cases
export const createDriverMarker = (x: number, y: number, id: string = 'driver'): Marker => ({
  id,
  x,
  y,
  icon: '🚗',
  color: '#ef4444',
  size: 4
});

export const createPickupMarker = (x: number, y: number, id: string = 'pickup'): Marker => ({
  id,
  x,
  y,
  icon: '📍',
  color: '#22c55e',
  size: 3
});

export const createDropoffMarker = (x: number, y: number, id: string = 'dropoff'): Marker => ({
  id,
  x,
  y,
  icon: '🏁',
  color: '#3b82f6',
  size: 3
});

export const createCustomMarker = (
  x: number, 
  y: number, 
  icon: string, 
  color: string, 
  id?: string,
  size?: number
): Marker => ({
  id: id || `custom-${Date.now()}`,
  x,
  y,
  icon,
  color,
  size: size || 3
});

// Utility to calculate distance between two points (simplified)
export const calculateDistance = (point1: { x: number; y: number }, point2: { x: number; y: number }): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Helper to generate random position within map bounds
export const generateRandomPosition = (minX: number = 10, maxX: number = 90, minY: number = 10, maxY: number = 90) => ({
  x: minX + Math.random() * (maxX - minX),
  y: minY + Math.random() * (maxY - minY)
});
