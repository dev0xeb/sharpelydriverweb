import React, { useEffect } from 'react';

interface UnauthorizedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequest?: () => void;
}

const UnauthorizedAccessModal: React.FC<UnauthorizedAccessModalProps> = ({ isOpen, onClose, onRequest }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
          <div className="px-6 py-6 text-center">
            <h3 className="text-xl sm:text-2xl font-extrabold text-red-600 mb-3">You can’t access this</h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Sorry, You cannot access this because you are not registered under the company
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-2">
              But you can <span className="text-blue-600 underline">request</span> to get access to
              getting delivery tasks
            </p>
            <button
              onClick={onRequest}
              className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccessModal;
