import React, { useState } from 'react';
import { AppLayout } from '../common';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  pickup: string;
  lastStop?: string;
  amount: number;
  priority: 'priority' | 'normal';
  status: 'completed' | 'pending';
}

const C_TASKS: TaskItem[] = [
  { id: '1', title: 'Planned delivery', pickup: 'No 7 Apaja Road, PH', lastStop: 'University of PH', amount: 300, priority: 'priority', status: 'completed' },
  { id: '2', title: 'Soma Abu', description: '08138514847', pickup: 'No 7 Apaja Road, PH', amount: 250, priority: 'normal', status: 'completed' },
];

const P_TASKS: TaskItem[] = [
  { id: '3', title: 'Ali Baba', description: '08138514847', pickup: 'No 1 Ade st, PH', amount: 280, priority: 'priority', status: 'pending' },
];

const Badge: React.FC<{ label: string; color: 'green' | 'orange' }> = ({ label, color }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${color === 'green' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{label}</span>
);

const PriorityTag: React.FC<{ type: 'priority' | 'normal' }> = ({ type }) => (
  <div className={`flex items-center gap-1 text-xs font-medium ${type === 'priority' ? 'text-red-500' : 'text-yellow-600'}`}>
    <span className={`w-4 h-4 rounded-sm flex items-center justify-center ${type === 'priority' ? 'bg-red-500' : 'bg-yellow-400'}`}>{type === 'priority' ? '⚡' : '⭐'}</span>
    <span className="uppercase">{type === 'priority' ? 'PRIORITY' : 'Normal'}</span>
  </div>
);

const Card: React.FC<{ item: TaskItem }> = ({ item }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <PriorityTag type={item.priority} />
        <h3 className="mt-2 text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
        {item.description && <p className="text-sm text-gray-600 mt-1 truncate">{item.description}</p>}
        <div className="mt-3 text-sm text-gray-900"><span className="font-semibold">Pick Up: </span>{item.pickup}</div>
        {item.lastStop && <div className="text-sm text-gray-900"><span className="font-semibold">Last stop: </span>{item.lastStop}</div>}
      </div>
      <div className="text-right ml-4 flex flex-col items-end gap-2">
        <div className="text-lg font-bold text-gray-900">₦{item.amount}</div>
        {item.status === 'pending' && <Badge label="pending" color="orange" />}
        {item.status === 'completed' && <Badge label="Completed" color="green" />}
        {item.status === 'pending' && (
          <button className="mt-1 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold">Start</button>
        )}
      </div>
    </div>
    <div className="mt-3 flex justify-center">
      <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-gray-400 rotate-45" />
    </div>
  </div>
);

const TaskUpdateScreen: React.FC = () => {
  const [tab, setTab] = useState<'completed' | 'pending'>('completed');
  const items = tab === 'completed' ? C_TASKS : P_TASKS;

  return (
    <AppLayout title="Task Update" showStatusToggle={false}>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-5">
          <button onClick={() => setTab('completed')} className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'completed' ? 'bg-red-600 text-white' : 'text-gray-700'}`}>Completed Tasks</button>
          <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'pending' ? 'bg-red-600 text-white' : 'text-gray-700'}`}>Pending Task</button>
        </div>

        <div className="space-y-4">
          {items.map((t) => (
            <Card key={t.id} item={t} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskUpdateScreen;
