import React from 'react';

interface ProfilePictureUploadProps {
  onFileSelect?: (file: File) => void;
  currentImage?: string;
  size?: 'default' | 'large';
  className?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onFileSelect,
  currentImage,
  size = 'default',
  className = ''
}) => {
  const sizeClasses = size === 'large' ? 'w-36 h-36' : 'w-32 h-32';
  const lgSizeClasses = size === 'large' ? 'lg:w-40 lg:h-40' : 'lg:w-36 lg:h-36';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className={`flex flex-col items-center mb-8 ${className}`}>
      <div className={`relative ${sizeClasses} ${lgSizeClasses} mb-2`}>
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-300" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="profile-picture-upload"
        />
        <label
          htmlFor="profile-picture-upload"
          className="absolute right-2 bottom-2 bg-blue-500 rounded-full w-7 h-7 flex items-center justify-center border-none outline-none cursor-pointer text-white text-xl font-bold leading-none hover:bg-blue-600 transition-colors"
        >
          <span>+</span>
        </label>
      </div>
      <div className="font-normal text-sm text-gray-700">Upload a picture</div>
    </div>
  );
};

export default ProfilePictureUpload;