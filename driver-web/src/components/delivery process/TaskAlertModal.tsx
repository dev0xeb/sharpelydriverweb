import React, { useEffect } from 'react';

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconBell = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

interface TaskAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  pickUp: string;
  dropOff: string;
}

const TaskAlertModal: React.FC<TaskAlertModalProps> = ({ isOpen, onClose, onAccept, onDecline, pickUp, dropOff }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" aria-labelledby="task-alert-title" className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl border border-gray-200">
          {/* Close */}
          <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">
            <IconX className="w-5 h-5 text-gray-600" />
          </button>

          <div className="px-6 pt-7 pb-6">
            <h3 id="task-alert-title" className="text-xl sm:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-2">
              Task Alert
              <span className="text-amber-500"><IconBell className="w-5 h-5" /></span>
            </h3>
            <p className="text-center text-gray-600 mt-2">You have a new delivery task from Sharpenly</p>

            <div className="mt-5 space-y-2 text-center">
              <p className="text-sm"><span className="font-semibold text-amber-600">Pick Up:</span> <span className="text-gray-800">{pickUp}</span></p>
              <p className="text-sm"><span className="font-semibold text-green-600">Drop Off:</span> <span className="text-gray-800">{dropOff}</span></p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button onClick={onAccept} className="py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Accept
              </button>
              <button onClick={onDecline} className="py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAlertModal;
