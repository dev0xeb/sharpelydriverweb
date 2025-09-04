import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className={`font-bold text-xl lg:text-2xl text-gray-900 mb-2 ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-normal text-sm lg:text-base text-gray-700 leading-relaxed ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;