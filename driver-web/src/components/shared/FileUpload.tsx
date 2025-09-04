import React from 'react';
import icons from '../../assets/icon';

interface FileUploadProps {
  label: string;
  required?: boolean;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, required, description }) => {
  return (
    <div className="mb-6">
      <label className="font-bold text-base text-gray-900 flex justify-start gap-2 items-center mb-2">
        {label}
        {required && <span className="text-red-600 text-sm font-bold">Required</span>}
      </label>
      <div className="font-normal text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
        {description}
      </div>
      <button
        type="button"
        className="mt-2 rounded-xl bg-red-100 px-4 py-3 text-red-600 font-semibold w-40 cursor-pointer flex items-center justify-center border-none transition-colors hover:bg-red-100"
      >
        <img src={icons.addFile} alt="Add file" className="w-5 h-5 mr-2" />
        <span className="text-gray-600">Upload file</span>
      </button>
    </div>
  );
};

export default FileUpload;
