import React from 'react';
import SidebarNavigation from './SidebarNavigation';
import MobileBottomNavigation from './MobileBottomNavigation';
import StatusBadge from './StatusBadge';
import OnlineStatusToggle from './OnlineStatusToggle';

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  isOnline?: boolean;
  onToggleStatus?: () => void;
  showStatusToggle?: boolean;
  navigationItems?: Array<{
    icon: string;
    label: string;
    active: boolean;
    onClick?: () => void;
  }>;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  subtitle,
  children,
  rightContent,
  isOnline = false,
  onToggleStatus,
  showStatusToggle = false,
  navigationItems,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col lg:flex-row ${className}`}>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {showStatusToggle && onToggleStatus && (
              <OnlineStatusToggle 
                isOnline={isOnline} 
                onToggle={onToggleStatus}
                size="sm"
              />
            )}
            {showStatusToggle && <StatusBadge isOnline={isOnline} />}
          </div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <SidebarNavigation items={navigationItems} />
        </div>

        {/* Status Toggle (Desktop) */}
        {showStatusToggle && onToggleStatus && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <StatusBadge isOnline={isOnline} />
              <OnlineStatusToggle 
                isOnline={isOnline} 
                onToggle={onToggleStatus}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {rightContent}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation items={navigationItems} />
    </div>
  );
};

export default AppLayout;
