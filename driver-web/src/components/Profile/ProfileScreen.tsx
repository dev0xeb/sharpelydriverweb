import React from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icon';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const menu = [
    { icon: icons.AccountProfile, label: 'Account', onClick: () => navigate('/profile/account') },
    { icon: icons.InviteFriends, label: 'Invite Friends', onClick: () => navigate('/profile/invite') },
    { icon: icons.Pricing, label: 'Pricing' },
    { icon: icons.Navigation, label: 'Navigation', onClick: () => navigate('/profile/navigation') },
    { icon: icons.AppsSettings, label: 'App Settings', onClick: () => navigate('/profile/settings') },
    { icon: icons.FAQ, label: 'FAQ' },
    { icon: icons.LogOut, label: 'Logout' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with curved red background */}
      <div className="relative bg-red-600 text-white">
        <div className="h-40 sm:h-48 bg-red-600 rounded-b-[48px] sm:rounded-b-[64px]" />
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          <span className="block w-4 h-4 border-l-2 border-b-2 border-white rotate-45 ml-1" />
        </button>

        {/* Card */}
        <div className="absolute inset-x-0 top-10 sm:top-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white overflow-hidden ring-4 ring-white/30 flex items-center justify-center">
                <span className="text-2xl">🧑🏾‍🦱</span>
              </div>
              <div className="flex-1">
                <div className="font-extrabold text-lg sm:text-xl">Johnny Buffer</div>
                <div className="text-xs sm:text-sm text-white/90">junnybuffer432@gmail.com</div>
                <div className="text-xs sm:text-sm text-white/90">0908764268</div>
                <div className="mt-1 inline-flex items-center bg-white rounded-full px-2 py-0.5 text-sm font-semibold text-yellow-600">
                  ⭐ <span className="ml-1 text-gray-900">4.7</span>
                </div>
              </div>
              <button onClick={() => navigate('/profile/edit')} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center" title="Edit">
                ✎
              </button>
            </div>

            {/* Stats pill */}
            <div className="mt-6 bg-white text-gray-900 rounded-2xl shadow px-5 py-4 flex items-center justify-between">
              <div className="text-center">
                <div className="font-extrabold text-lg">7.5</div>
                <div className="text-xs text-gray-500">Time online</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="font-extrabold text-lg">13.3 km</div>
                <div className="text-xs text-gray-500">Total Distance</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="font-extrabold text-lg">26</div>
                <div className="text-xs text-gray-500">Total Dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 sm:px-6 pt-36 sm:pt-40 pb-6 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow divide-y divide-gray-100">
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick as any}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50"
            >
              <img src={item.icon as string} alt={item.label} className="w-[25px] h-[25px]" />
              <span className="font-medium text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-16 lg:h-0" />
    </div>
  );
};

export default ProfileScreen;
