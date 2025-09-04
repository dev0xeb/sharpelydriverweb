import React from 'react';
import { AppLayout } from '../common';
import { useNavigate } from 'react-router-dom';
import UnauthorizedAccessModal from './UnauthorizedAccessModal';

type Segment = { value: number; color: string; label: string };

const DonutChart: React.FC<{ segments: Segment[]; size?: number; stroke?: number }> = ({ segments, size = 180, stroke = 24 }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {/* background ring */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const dash = (seg.value / total) * c;
          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
      </g>
    </svg>
  );
};

const currency = (n: number) => `₦${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AnalysisEarningScreen: React.FC = () => {
  // Sample data
  const incomeSegments: Segment[] = [
    { value: 40, color: '#ef4444', label: 'Cash payment' },
    { value: 25, color: '#22c55e', label: 'Sharperly Wallet' },
    { value: 20, color: '#3b82f6', label: 'Bank Transfer' },
    { value: 15, color: '#f59e0b', label: 'Others' },
  ];

  const deliverySegments: Segment[] = [
    { value: 70, color: '#22c55e', label: 'Successful Deliveries' },
    { value: 10, color: '#f59e0b', label: 'Pending Deliveries' },
    { value: 8, color: '#ef4444', label: 'Unsuccessful Deliveries' },
    { value: 12, color: '#9ca3af', label: 'Distance covered' },
  ];

  const navigate = useNavigate();
  const [showUnauthorized, setShowUnauthorized] = React.useState(false);
  // Toggle this flag with real auth logic later
  const canAccessTasks = true;
  return (
    <AppLayout title="Analysis" subtitle="Track earnings and deliveries" showStatusToggle={false}>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Total earning card */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-800 font-extrabold text-lg">Total Earning</div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">This is the total you have made since you started your rides</p>
            <div className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">{currency(300467.47)}</div>
          </div>
          <button className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">Click for Breakdown</button>
        </div>

        {/* Donut charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income distribution */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart segments={incomeSegments} />
              <div className="flex-1 w-full">
                <ul className="space-y-3">
                  {incomeSegments.map((s, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                        <span className="text-gray-700">{s.label}</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{currency(Math.round(s.value * 15643))}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm">Total weekly earning <span className="ml-2 font-bold text-gray-900">{currency(166390.94)}</span></div>
            </div>
          </div>

          {/* Deliveries */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart segments={deliverySegments} />
              <div className="flex-1 w-full">
                <ul className="space-y-3">
                  {deliverySegments.map((s, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                        <span className="text-gray-700">{s.label}</span>
                      </div>
                      <span className="text-gray-900 font-semibold">{Math.round(s.value * 7)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm">Total weekly Deliveries <span className="ml-2 font-bold text-gray-900">524 deliveries completed</span></div>
            </div>
          </div>
        </div>

        {/* Task update */}
        <button onClick={() => { if (canAccessTasks) navigate('/analysis/tasks'); else setShowUnauthorized(true); }} className="bg-white rounded-2xl shadow border border-gray-100 p-5 sm:p-6 w-full flex items-center justify-between text-left">
          <div>
            <div className="text-gray-800 font-extrabold">Task Update</div>
            <p className="text-sm text-gray-600">Check to the tasks you have completed and yet to complete</p>
          </div>
          <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
        </button>
      </div>
      <UnauthorizedAccessModal
        isOpen={showUnauthorized}
        onClose={() => setShowUnauthorized(false)}
        onRequest={() => setShowUnauthorized(false)}
      />
    </AppLayout>
  );
};

export default AnalysisEarningScreen;
