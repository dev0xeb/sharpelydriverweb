import React from 'react';
import CompanyDriverBankDetails from './CompanyDriverBankDetails';
import Header from '../shared/Header';
import Button from '../shared/Button';
import FileUpload from '../shared/FileUpload';
import icons from '../../assets/icon';
import Card from '../shared/Card';

interface CompanyDriverDocumentProps {
  onBack: () => void;
  onNext?: () => void;
  variant?: 'onboarding' | 'manage';
}

const DocumentItem: React.FC<{
  title: string;
  description?: string;
  accept?: string;
  inputId: string;
}> = ({ title, description, accept, inputId }) => {
  return (
    <Card variant="bordered" padding="small" className="mb-6">
      <div className="mb-3">
        <div className="text-gray-900 font-semibold text-base">{title}</div>
        {description && (
          <p className="text-gray-700 text-sm mt-1 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-6 items-start">
        <div className="w-full h-36 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <label
              htmlFor={inputId}
              className="inline-flex items-center justify-center rounded-xl bg-red-100 px-4 py-3 text-red-600 font-semibold cursor-pointer select-none"
            >
              <img src={icons.addFile} alt="Add file" className="w-5 h-5 mr-2" />
              <span className="text-gray-600">Replace file</span>
            </label>
            <input id={inputId} type="file" accept={accept} className="hidden" />
          </div>
          <button type="button" className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded-lg">
            Remove
          </button>
          <div className="text-xs text-gray-500 sm:ml-auto">Accepted: JPG, PNG, PDF. Max 10MB</div>
        </div>
      </div>
    </Card>
  );
};

const CompanyDriverDocument: React.FC<CompanyDriverDocumentProps> = ({ onBack, onNext, variant = 'onboarding' }) => {
  const [showBankDetails, setShowBankDetails] = React.useState(false);

  const handleNext = () => {
    setShowBankDetails(true);
  };

  const handleBackFromBankDetails = () => {
    setShowBankDetails(false);
  };

  if (variant === 'onboarding') {
    if (showBankDetails) {
      return <CompanyDriverBankDetails onBack={handleBackFromBankDetails} onNext={onNext} />;
    }

    return (
      <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
          <Header
            onBack={onBack}
            title="Yay! Almost done"
            subtitle="Some few questions to answer"
            progress={2}
          />

          <div className="w-full mt-5 lg:mt-8 lg:max-w-lg lg:mx-auto">
            <div className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Document</div>
            <div className="font-normal text-sm lg:text-base text-gray-700 mb-5 leading-relaxed">
              We are legally obligated & required to ask you for some documents to signup as a driver/rider. <br />
              Document scan & quality pictures will be accepted
            </div>

            <form
              className="flex flex-col w-full space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <FileUpload
                label="Driver's Licenses"
                required
                description="Please provide a driver license showing a clear picture of your license number, name and date of birth"
              />

              <FileUpload
                label="Riders Certification Card"
                required
                description="(FOR DELIVERY RIDERS ONLY), upload your VIO-certification card here"
              />

              <Button type="submit">
                Next
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={onBack} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Documents</h1>
      </div>

      <div className="flex-1 px-4 sm:px-6 pb-8 max-w-3xl mx-auto w-full">
        <div className="mt-2 mb-6">
          <div className="text-gray-900 font-bold text-lg">Manage your documents</div>
          <p className="text-gray-700 text-sm mt-1">Update or replace your stored documents below.</p>
        </div>

        <DocumentItem
          title="Driver's License"
          description="Provide a clear image showing license number, name and date of birth."
          accept="image/*,application/pdf"
          inputId="replace-license"
        />
        <DocumentItem
          title="Riders Certification Card"
          description="Upload your VIO-certification card."
          accept="image/*,application/pdf"
          inputId="replace-rider-card"
        />

        <div className="mt-8">
          <button type="button" className="w-full py-4 rounded-2xl bg-red-600 text-white font-extrabold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDriverDocument;
