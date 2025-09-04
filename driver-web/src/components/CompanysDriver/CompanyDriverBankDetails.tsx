
import React, { useState } from 'react';
import CompanyIdGeneration from './IdScreen';
import Header from '../shared/Header';
import Button from '../shared/Button';
import Input from '../shared/Input';

interface CompanyDriverBankDetailsProps {
  onBack: () => void;
  onNext?: () => void;
}

const CompanyDriverBankDetails: React.FC<CompanyDriverBankDetailsProps> = ({ onBack, onNext }) => {
  const [showIdGeneration, setShowIdGeneration] = useState(false);

  const handleNext = () => {
    setShowIdGeneration(true);
  };

  const handleIdGenerationBack = () => {
    setShowIdGeneration(false);
  };

  if (showIdGeneration) {
    return (
      <CompanyIdGeneration
        onBack={handleIdGenerationBack}
        onNext={onNext}
        onNavigateToDashboard={onNext}
      />
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        <Header
          onBack={onBack}
          title="Now the exciting part"
          subtitle="Lets get your bank details"
          progress={3}
        />

        <div className="w-full mt-5 lg:mt-8 lg:max-w-lg lg:mx-auto">
          <div className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Bank Verification</div>
          <div className="font-normal text-sm lg:text-base text-gray-700 mb-5 leading-relaxed">
            Please enter your right bank details and cross check properly before moving on to the next.
          </div>

          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <div className="w-full max-w-md mb-4 mx-auto">
              <select
                className="w-full p-3 border border-gray-300 rounded-xl text-base box-border transition-colors focus:border-blue-500 focus:outline-none text-gray-600"
                defaultValue=""
              >
                <option value="" disabled>Bank name</option>
                <option value="access">Access Bank</option>
                <option value="gtb">Guaranty Trust Bank</option>
                <option value="firstbank">First Bank of Nigeria</option>
                <option value="uba">United Bank for Africa</option>
                <option value="zenith">Zenith Bank</option>
                <option value="fcmb">First City Monument Bank</option>
                <option value="fidelity">Fidelity Bank</option>
                <option value="heritage">Heritage Bank</option>
                <option value="keystone">Keystone Bank</option>
                <option value="polaris">Polaris Bank</option>
                <option value="stanbic">Stanbic IBTC Bank</option>
                <option value="sterling">Sterling Bank</option>
                <option value="union">Union Bank</option>
                <option value="wema">Wema Bank</option>
                <option value="unity">Unity Bank</option>
              </select>
            </div>

            <Input label="" type="text" placeholder="Bank verification number" />
            <Input label="" type="text" placeholder="Bank account number" />
            <Input label="" type="text" placeholder="National Identification Number(NIN)" />

            <div className="mb-4">
              <div className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Security</div>
              <div className="font-normal text-sm lg:text-base text-gray-700 mb-5 leading-relaxed">
                Enter security password and pin to be able to gain access to your wallet (DO NOT FORGET THIS INFORMATION)
              </div>
            </div>

            <Input label="" type="password" placeholder="Password" />
            <Input label="" type="text" placeholder="4-digit pin" maxLength={4} />

            <Button type="submit">
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyDriverBankDetails;
