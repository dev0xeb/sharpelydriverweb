import React from 'react';

interface QuickActionCardProps {
  icon: string | React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  bgColorClassName?: string;
  iconColorClassName?: string;
  rightText?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  subtitle,
  bgColorClassName,
  iconColorClassName,
  rightText,
  showArrow = true,
  onClick
}) => {
  return (
    <div
      className="bg-[#FFDFE04F] rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-3 lg:p-4 flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 ${bgColorClassName || ''} rounded-lg mr-3 lg:mr-4 group-hover:scale-110 transition-transform`}>
          {typeof icon === 'string' ? (
            <img src={icon} alt={title} className="w-5 h-5 lg:w-6 lg:h-6 object-contain" />
          ) : (
            // Icon component (e.g., from lucide-react)
            React.createElement(icon, { className: `w-5 h-5 lg:w-6 lg:h-6 ${iconColorClassName || ''}` })
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1 text-sm lg:text-base">{title}</h4>
          <p className="text-xs lg:text-sm text-gray-600 leading-snug">{subtitle}</p>
        </div>

        {rightText && (
          <div className="ml-2 lg:ml-4 text-red-600 text-xs lg:text-sm whitespace-nowrap">
            {rightText}
          </div>
        )}

        {showArrow && (
          <div className="ml-2 lg:ml-3 text-gray-400 group-hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionCard; 