import React, { useState } from 'react';
import icons from '../../assets/icon';
import IndividualBankDetail from './IndividualBankDetail';
import Card from '../shared/Card';

interface RidersFormProps {
  onBack: () => void;
  onNext: () => void;
}

interface UploadState {
  motorcycle: File | null;
  certification: File | null;
  nin: File | null;
  roadworthiness: File | null;
  governmentId: File | null;
  ownership: File | null;
}

const Riders: React.FC<RidersFormProps> = ({ onBack, onNext }) => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [uploads, setUploads] = useState<UploadState>({
    motorcycle: null,
    certification: null,
    nin: null,
    roadworthiness: null,
    governmentId: null,
    ownership: null,
  });

  const handleFileUpload = (field: keyof UploadState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploads(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For development - allow navigation without uploads
    setShowBankDetails(true);
  };

  const handleBankDetailsBack = () => {
    setShowBankDetails(false);
  };

  if (showBankDetails) {
    return (
      <IndividualBankDetail
        onBack={handleBankDetailsBack}
        onNext={onNext}
      />
    );
  }

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
      </div>
    );
  };

  const renderUploadSection = (
    title: string,
    description: string,
    field: keyof UploadState,
    isRequired: boolean = true
  ) => (
    <Card variant="bordered" padding="small" className="mb-6">
      <div className="mb-3">
        <div className="flex items-start gap-2">
          <h3 className="font-bold text-base text-gray-900">{title}</h3>
          {isRequired && <span className="text-red-600 text-xs font-bold">Required</span>}
        </div>
        <p className="text-sm lg:text-base text-gray-700 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-6 items-start">
        <div className="w-full h-36 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload(field)}
              className="hidden"
              id={field}
            />
            <label
              htmlFor={field}
              className="inline-flex items-center justify-center rounded-xl bg-red-100 px-4 py-3 text-red-600 font-semibold cursor-pointer select-none"
            >
              <img src={icons.addFile} alt="Add file" className="w-5 h-5 mr-2" />
              <span className="text-gray-600">{uploads[field] ? 'Replace file' : 'Upload file'}</span>
            </label>
          </div>
          {uploads[field] && (
            <button
              type="button"
              onClick={() => setUploads(prev => ({ ...prev, [field]: null }))}
              className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded-lg"
            >
              Remove
            </button>
          )}
          <div className="text-xs text-gray-500 sm:ml-auto">Accepted: JPG, PNG, PDF. Max 10MB</div>
        </div>
      </div>
      {uploads[field] && (
        <div className="mt-2 text-xs text-green-600 font-medium truncate">✓ {uploads[field]!.name}</div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        {/* Header section */}
        <div className="w-full flex items-center mb-4 lg:mb-6">
          <button 
            className="p-0 bg-transparent border-none mr-4 cursor-pointer" 
            onClick={onBack}
          >
            <img src={icons.arrowBack} alt="Back" className="w-6 h-6 text-red-600" />
          </button>
          <div className="mt-2 flex-1">
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl lg:text-2xl text-gray-900">Yay! You are almost there</span>
              <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Some few questions to answer</span>
            </div>
            {renderProgressBar()}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full mt-6 lg:max-w-2xl lg:mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Document</h2>
            <p className="font-normal text-sm lg:text-base text-gray-700 leading-relaxed mb-2">
              We are legally obligated & required to ask you for some documents to signup as a driver/rider.
            </p>
            <p className="font-normal text-sm lg:text-base text-gray-700 leading-relaxed">
              Document scan & quality pictures will be accepted
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderUploadSection(
              "Photo of motorcycle",
              "Please provide a very clear picture of your ride here",
              "motorcycle"
            )}

            {renderUploadSection(
              "Riders Certification Card",
              "upload your VIO-certification card here",
              "certification"
            )}

            {renderUploadSection(
              "National Identity Number",
              "Who want to offer services through SHARPERLY",
              "nin"
            )}

            {renderUploadSection(
              "Certificate for Roadworthiness",
              "Upload certification",
              "roadworthiness"
            )}

            {renderUploadSection(
              "Government-issued ID card",
              "Upload government-issued ID card (eg) International passport, National ID, NIN etc",
              "governmentId"
            )}

            {renderUploadSection(
              "Prove Vehicle ownership",
              "Upload a prove that this vehicle belongs to you",
              "ownership"
            )}

            {/* Submit button */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors bg-gray-800 text-white hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Riders;
