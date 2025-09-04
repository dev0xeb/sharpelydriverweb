import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icon';
import CompanyDriverDocument from './CompanyDriverDocument';
import { COMPANY_DRIVER_FORM_FIELDS, type FormFieldConfig } from '../../constants';

const fields = COMPANY_DRIVER_FORM_FIELDS.map((field: FormFieldConfig) => ({ placeholder: field.label }));

const CompanyDriverForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div
          className={`h-1 w-16 rounded-sm ${step >= 1 ? 'bg-red-600' : 'bg-gray-300'}`}
        />
        <div
          className={`h-1 w-16 rounded-sm ${step >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}
        />
        <div
          className={`h-1 w-16 rounded-sm ${step >= 3 ? 'bg-red-600' : 'bg-gray-300'}`}
        />
      </div>
    );
  };

  const renderStep1 = () => (
    <>
      <div className="w-full flex items-center mb-2 lg:mb-6">
        <button className="p-0 bg-transparent border-none mr-2 lg:mr-4 cursor-pointer" onClick={() => navigate(-1)}>
          <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
        <div className="mt-3 flex-1">
          <div className="flex flex-col">
            <span className="font-bold text-xl lg:text-2xl text-gray-900">Hello there</span>
            <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Welcome, let's have you signed in</span>
          </div>
          {renderProgressBar()}
        </div>
      </div>

      <div className="w-full mt-5 lg:mt-8 lg:max-w-lg lg:mx-auto">
        <div className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Personal info</div>
        <div className="font-normal text-sm lg:text-base text-gray-700 mb-5 leading-relaxed">
          Only your first name and vehicle would be visible to the public
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 lg:w-36 lg:h-36 mb-2">
            <div className="w-full h-full rounded-full bg-gray-300" />
            <button className="absolute right-2 bottom-2 bg-blue-500 rounded-full w-7 h-7 flex items-center justify-center border-none outline-none cursor-pointer text-white text-xl font-bold leading-none hover:bg-blue-600 transition-colors">
              <span>+</span>
            </button>
          </div>
          <div className="font-normal text-sm text-gray-700">Upload a picture</div>
        </div>

        <form
          className="mt-8 flex flex-col w-full items-center"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          {fields.map((field: { placeholder: string }) => (
            <div key={field.placeholder} className="w-full max-w-md mb-4">
              <div className="font-medium text-sm text-gray-900 mb-3">{field.placeholder}</div>
              <input 
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" 
                placeholder={field.placeholder} 
              />
            </div>
          ))}
          
          <div className="w-full max-w-md mb-4 relative">
            <div className="font-medium text-sm text-gray-900 mb-3">Date of birth</div>
            <input className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" placeholder="Date of birth" />
            <img
              src={icons.dropDown}
              alt="Dropdown"
              className="absolute right-5 top-12 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
            />
          </div>
          
          <div className="w-full max-w-md mb-4">
            <div className="font-medium text-sm text-gray-900 mb-3">What state are you from?</div>
            <input className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" placeholder="Select state" />
          </div>
          
          <div className="w-full max-w-md mb-4">
            <div className="font-medium text-sm text-gray-900 mb-3">Enter your home address</div>
            <input className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500" placeholder="" />
          </div>
          
          <button 
            type="submit" 
            className="w-full max-w-md bg-gray-800 text-white rounded-xl p-4 font-bold text-lg mt-5 mb-2 border-none cursor-pointer transition-colors hover:bg-gray-600"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        {step === 1 ? renderStep1() : <CompanyDriverDocument onBack={() => setStep(1)} onNext={() => navigate('/dashboard')} />}
      </div>
    </div>
  );
};

export default CompanyDriverForm;
