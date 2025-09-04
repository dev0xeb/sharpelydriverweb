import React from 'react';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  icon: string; // Imported image source
  label: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

interface MobileBottomNavigationProps {
  items?: NavigationItem[];
  className?: string;
}

const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({
  items = SIDEBAR_ITEMS,
  className = ''
}) => {
  const navigate = useNavigate();
  return (
    <div className={`lg:hidden bg-white border-t border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex justify-around">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => { if (item.onClick) item.onClick(); else if (item.href) navigate(item.href); }}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              item.active
                ? 'text-red-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
