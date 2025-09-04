import React from 'react';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface SidebarItem {
  icon: string; // Imported image source
  label: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

interface SidebarNavigationProps {
  items?: SidebarItem[];
  className?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items = SIDEBAR_ITEMS,
  className = ''
}) => {
  const navigate = useNavigate();
  return (
    <nav className={`space-y-1 px-4 py-4 ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => { if (item.onClick) item.onClick(); else if (item.href) navigate(item.href); }}
          className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors ${
            item.active
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
