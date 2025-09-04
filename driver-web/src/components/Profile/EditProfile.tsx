import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePictureUpload from '../shared/ProfilePictureUpload';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full rounded-2xl border border-gray-300 px-4 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${props.className || ''}`}
  />
);

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Jonny');
  const [lastName, setLastName] = useState('Buffer');
  const [email, setEmail] = useState('junnybuffer432@gmail.com');
  const [phone, setPhone] = useState('0908764268');
  const [address, setAddress] = useState('Stree, 67, latthhe htyyunfdsfhhb');

  const handleDone = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Edit Profile</h1>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pb-8 max-w-md mx-auto w-full">
        {/* Avatar */}
        <div className="flex items-center justify-center mt-2 mb-6">
          <div className="relative">
            <ProfilePictureUpload onFileSelect={() => {}} />
            <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">+</div>
          </div>
        </div>

        <div className="space-y-4">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jonny" />
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Buffer" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="junnybuffer432@gmail.com" type="email" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0908764268" inputMode="tel" />
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Stree, 67, latthhe htyyunfdsfhhb" />
        </div>

        <div className="mt-8">
          <button onClick={handleDone} className="w-full py-4 rounded-2xl bg-red-600 text-white font-extrabold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Done</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
