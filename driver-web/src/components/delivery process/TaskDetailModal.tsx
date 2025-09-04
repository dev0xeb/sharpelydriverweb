import React, { useEffect } from 'react';
// Inline SVG icon components to avoid external icon dependency
const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconMessage = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export type DestinationStatus = 'pending' | 'paid';

export interface DestinationItem {
  id: string;
  address: string;
  phone?: string;
  status: DestinationStatus;
}

export interface TaskDetailData {
  id: string;
  title: string;
  amount: number;
  pickUp: string;
  lastStop: string;
  noteFromAdmin?: string;
  priority?: 'priority' | 'normal';
  destinations: DestinationItem[];
}

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskDetailData | null;
  onStart?: (taskId: string) => void;
}

const statusStyles: Record<DestinationStatus, string> = {
  pending: 'bg-orange-100 text-orange-700',
  paid: 'bg-green-100 text-green-700',
};

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task, onStart }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-title"
        className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header strip */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1 shadow">
          <div className="flex items-center text-red-600 text-xs font-semibold uppercase tracking-wide">
            <span className="mr-1">⚡</span> PRIORITY
          </div>
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Close">
          <IconX className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-5 sm:p-6 lg:p-8">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              <h2 id="task-title" className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{task.title}</h2>
            </div>
            <div className="text-right">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">₦{task.amount}</div>
              <div className="mt-1 inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5">pending</div>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-5 space-y-3">
            <div className="text-sm sm:text-base text-gray-900">
              <span className="font-semibold">Pick Up:</span> {task.pickUp}
            </div>
            <div className="text-sm sm:text-base text-gray-900">
              <span className="font-semibold">Last stop:</span> {task.lastStop}
            </div>
          </div>

          {/* Note */}
          {task.noteFromAdmin && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Note from Admin</p>
              <div className="rounded-lg bg-red-500 text-white p-4 text-sm leading-relaxed">
                {task.noteFromAdmin}
              </div>
            </div>
          )}

          {/* Destinations */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Destinations:</p>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              {task.destinations.map((d, idx) => (
                <div key={d.id} className={`flex items-center justify-between p-4 sm:p-5 ${idx !== task.destinations.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{d.address}</p>
                    {d.phone && <p className="text-xs text-gray-500 mt-1">{d.phone}</p>}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[d.status]}`}>{d.status}</span>
                    <button className="shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500" aria-label="Message on WhatsApp">
                      <IconMessage className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Collapse affordance */}
              <div className="flex items-center justify-center py-2 text-gray-500 text-sm">
                <IconChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Click here to start your task</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => onStart && onStart(task.id)}
                className="ml-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
