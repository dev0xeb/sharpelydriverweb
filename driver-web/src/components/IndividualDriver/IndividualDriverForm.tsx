import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icon';
import IndividualLicense from './IndividualLicense';
import PricingScreen from './PricingScreen';
import SuccessScreen from '../CompanysDriver/SuccessScreen';

const IndividualDriverForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-start mt-4 space-x-2">
        <div className={`h-1 w-12 lg:w-16 rounded-sm ${step >= 1 ? 'bg-red-600' : 'bg-gray-300'}`} />
        <div className={`h-1 w-12 lg:w-16 rounded-sm ${step >= 2 ? 'bg-red-600' : 'bg-gray-300'}`} />
        <div className={`h-1 w-12 lg:w-16 rounded-sm ${step >= 3 ? 'bg-red-600' : 'bg-gray-300'}`} />
        <div className={`h-1 w-12 lg:w-16 rounded-sm ${step >= 4 ? 'bg-red-600' : 'bg-gray-300'}`} />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
      </div>
    );
  };

  const renderStep1 = () => (
    <>
      {/* Header section */}
      <div className="w-full flex items-center mb-4 lg:mb-6">
        <button 
          className="p-0 bg-transparent border-none mr-4 cursor-pointer" 
          onClick={() => navigate(-1)}
        >
          <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
        <div className="mt-2 flex-1">
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl lg:text-2xl text-gray-900">Hello there</span>
            <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Welcome, let's have you signed in</span>
          </div>
          {renderProgressBar()}
        </div>
      </div>

      {/* Main content */}
      <div className="w-full mt-6 lg:max-w-2xl lg:mx-auto">
        <div className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Personal info</div>
        <div className="font-normal text-sm lg:text-base text-gray-700 mb-6 leading-relaxed">
          Only your first name and vehicle would be visible to the public
        </div>

        {/* Upload picture section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 lg:w-36 lg:h-36 mb-2">
            <div className="w-full h-full rounded-full bg-gray-300" />
            <button className="absolute right-2 bottom-2 bg-blue-500 rounded-full w-7 h-7 flex items-center justify-center border-none outline-none cursor-pointer text-white text-xl font-bold leading-none hover:bg-blue-600 transition-colors">
              <span>+</span>
            </button>
          </div>
          <div className="font-normal text-sm text-gray-700">Upload a picture</div>
        </div>

        {/* Form */}
        <form
          className="flex flex-col space-y-4 lg:space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          {/* Basic info fields */}
          <div className="space-y-4">
            <input 
              className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
              placeholder="Full name" 
            />
            <input 
              className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
              placeholder="Gender" 
            />
            <input 
              className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
              placeholder="Email" 
            />
            <input 
              className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
              placeholder="Date of birth" 
            />
          </div>

          {/* Referral code section */}
          <div className="space-y-2">
            <label className="font-medium text-sm lg:text-base text-gray-900 block">Referral code</label>
            <input 
              className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
              placeholder="Enter code" 
            />
            <div className="font-normal text-xs lg:text-sm text-gray-600">
              Enter referral code, if someone referred you
            </div>
          </div>

          {/* Driver type selection */}
          <div className="space-y-2">
            <label className="font-medium text-sm lg:text-base text-gray-900 block">Driver Type Selection</label>
            <select className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600" defaultValue="">
              <option value="" disabled>Select driver type</option>
              <option value="taxi">Taxi Driver</option>
              <option value="delivery">Delivery Driver</option>
              <option value="rideshare">Rideshare Driver</option>
              <option value="commercial">Commercial Driver</option>
            </select>
          </div>

          {/* Vehicle manufacturer and model */}
          <div className="space-y-4">
            <label className="font-medium text-sm lg:text-base text-gray-900 block">Vehicle Manufacturer & Model</label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <select className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600" defaultValue="">
                <option value="" disabled>Select manufacturer</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="nissan">Nissan</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="bmw">BMW</option>
                <option value="audi">Audi</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="ford">Ford</option>
                <option value="hyundai">Hyundai</option>
                <option value="kia">Kia</option>
              </select>
              <select className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600" defaultValue="">
                <option value="" disabled>Select model</option>
                <option value="camry">Camry</option>
                <option value="corolla">Corolla</option>
                <option value="accord">Accord</option>
                <option value="civic">Civic</option>
                <option value="altima">Altima</option>
                <option value="sentra">Sentra</option>
              </select>
            </div>
          </div>

          {/* Vehicle details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium text-sm lg:text-base text-gray-900 block">Vehicle Year</label>
              <input 
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
                placeholder="Enter vehicle year" 
                type="number"
                min="1990"
                max="2024"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm lg:text-base text-gray-900 block">Vehicle License Plate Number</label>
              <input 
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
                placeholder="Enter license plate number" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm lg:text-base text-gray-900 block">Vehicle Color</label>
              <input 
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
                placeholder="Enter vehicle color" 
              />
            </div>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full bg-gray-800 text-white rounded-xl p-4 font-bold text-lg mt-8 border-none cursor-pointer transition-colors hover:bg-gray-600"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );

  if (step === 2) {
    return (
      <IndividualLicense
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    );
  }

  if (step === 3) {
    return (
      <PricingScreen
        onBack={() => setStep(2)}
        onNext={() => navigate('/dashboard')}
        onNavigateToSuccess={() => setStep(4)}
      />
    );
  }

  if (step === 4) {
    return (
      <SuccessScreen
        onStartDelivery={() => {}}
        onNavigateToDashboard={() => navigate('/dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        {step === 1 ? renderStep1() : null}
      </div>
    </div>
  );
};

export default IndividualDriverForm;