import React from 'react';
import { MAP_ROADS, MAP_BUILDINGS, BUSINESS_DISTRICTS } from '../../utils/constants';

interface Marker {
  id: string;
  x: number;
  y: number;
  icon: string;
  color: string;
  size?: number;
}

interface MapBackgroundProps {
  markers?: Marker[];
  className?: string;
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ 
  markers = [], 
  className = '',
  children 
}) => {
  return (
    <div className={`relative w-full h-full bg-gray-100 ${className}`}>
      {/* Map SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Roads */}
        {MAP_ROADS.map((road, index) => (
          <path
            key={`road-${index}`}
            d={road}
            stroke="#e5e7eb"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Buildings */}
        {MAP_BUILDINGS.map((building, index) => (
          <rect
            key={`building-${index}`}
            x={building.x}
            y={building.y}
            width={building.width}
            height={building.height}
            fill={building.color}
            opacity="0.7"
          />
        ))}

        {/* Business District Labels */}
        {BUSINESS_DISTRICTS.map((district, index) => (
          <text
            key={`district-${index}`}
            x={district.x}
            y={district.y}
            fontSize="3"
            fill="#6b7280"
            textAnchor="middle"
          >
            {district.name}
          </text>
        ))}

        {/* Custom Markers */}
        {markers.map((marker) => (
          <g key={marker.id}>
            <circle
              cx={marker.x}
              cy={marker.y}
              r={marker.size || 3}
              fill={marker.color}
            />
            <text
              x={marker.x}
              y={marker.y + 1}
              fontSize="2"
              fill="white"
              textAnchor="middle"
            >
              {marker.icon}
            </text>
          </g>
        ))}
      </svg>

      {/* Overlay Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default MapBackground;
