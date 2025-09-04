import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Inline icons
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
const IconFilter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 3H2l8 9v7l4 2v-9l8-9z" />
  </svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
import icons from '../../assets/icon';
import TaskDetailModal from './TaskDetailModal';
import type { TaskDetailData } from './TaskDetailModal';
import TaskAlertModal from './TaskAlertModal';

interface DispatchTask {
  id: string;
  title: string;
  description: string;
  pickupLocation: string;
  amount: number;
  status: 'pending' | 'paid';
  priority: 'priority' | 'normal';
}

const DISPATCH_TASKS: DispatchTask[] = [
  {
    id: '1',
    title: 'Planned delivery',
    description: 'No 7 Apaja Road, PH',
    pickupLocation: 'University of PH',
    amount: 300,
    status: 'pending',
    priority: 'priority'
  },
  {
    id: '2',
    title: 'Ali Baba',
    description: '08138514847',
    pickupLocation: 'No 7 Apaja Road, PH',
    amount: 300,
    status: 'paid',
    priority: 'priority'
  },
  {
    id: '3',
    title: 'Soma Abu',
    description: '08138514847',
    pickupLocation: 'No 7 Apaja Road, PH',
    amount: 250,
    status: 'pending',
    priority: 'priority'
  },
  {
    id: '4',
    title: 'Soma Abu',
    description: '08138514847',
    pickupLocation: 'No 7 Apaja Road, PH',
    amount: 250,
    status: 'pending',
    priority: 'normal'
  },
  {
    id: '5',
    title: 'Nengi Eli',
    description: '08138514847',
    pickupLocation: 'No 7 Apaja Road, PH',
    amount: 250,
    status: 'pending',
    priority: 'normal'
  }
];

const DispatchTasks: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertPickUp, setAlertPickUp] = useState('');
  const [alertDropOff, setAlertDropOff] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartTask = (taskId: string) => {
    const base = DISPATCH_TASKS.find(t => t.id === taskId);
    if (base) {
      setAlertPickUp(base.description);
      setAlertDropOff(base.pickupLocation);
      setShowAlert(true);
    }
  };

  const filteredTasks = DISPATCH_TASKS.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTask: TaskDetailData | null = useMemo(() => {
    if (!selectedTaskId) return null;
    const base = DISPATCH_TASKS.find(t => t.id === selectedTaskId);
    if (!base) return null;
    // Map to detailed data; in a real app, fetch by id
    const detail: TaskDetailData = {
      id: base.id,
      title: base.title,
      amount: base.amount,
      pickUp: `No 7 Apaja Road, PH`,
      lastStop: base.pickupLocation,
      noteFromAdmin: 'Please confirm payment before handing over deliveries, some payment are still pending. SAFE',
      priority: base.priority,
      destinations: [
        { id: 'd1', address: 'Area 10- mohab estate NO. 23 STREET', phone: '08138514847', status: 'pending' },
        { id: 'd2', address: 'Area 10- mohab estate NO. 23 STREET', phone: '08138514847', status: 'paid' },
        { id: 'd3', address: 'Area 10- mohab estate NO. 23 STREET', phone: '08138514847', status: 'paid' },
        { id: 'd4', address: 'Area 10- mohab estate NO. 23 STREET', phone: '08138514847', status: 'pending' },
        { id: 'd5', address: 'Area 10- mohab estate NO. 23 STREET', phone: '08138514847', status: 'paid' }
      ]
    };
    return detail;
  }, [selectedTaskId]);

  const renderPriorityIcon = (priority: 'priority' | 'normal') => {
    if (priority === 'priority') {
      return (
        <div className="flex items-center space-x-1 text-red-500 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">🚩</span>
          </div>
          <span className="text-xs font-medium uppercase">PRIORITY</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 text-yellow-500 mb-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">⭐</span>
          </div>
          <span className="text-xs font-medium uppercase">NORMAL</span>
        </div>
      );
    }
  };

  const renderStatusBadge = (status: 'pending' | 'paid') => {
    const statusConfig = {
      pending: { bg: 'bg-orange-100', text: 'text-orange-600', label: 'pending' },
      paid: { bg: 'bg-green-100', text: 'text-green-600', label: 'paid' }
    };

    const config = statusConfig[status];
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-0 bg-transparent border-none cursor-pointer"
          >
            <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dispatch Tasks</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex space-x-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-full bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <IconFilter className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter</span>
            <IconChevronDown className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedTaskId(task.id)}
          >
            <div className="flex justify-between items-start">
              {/* Left Section */}
              <div className="flex-1">
                {renderPriorityIcon(task.priority)}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {task.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  {task.description}
                </p>
                
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Pick Up: </span>
                  {task.pickupLocation}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-end space-y-3 ml-6">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ₦{task.amount}
                  </div>
                  {renderStatusBadge(task.status)}
                </div>
                
                <button
                  onClick={(e) => { e.stopPropagation(); handleStartTask(task.id); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
      {/* Detail Modal */}
      <TaskDetailModal
        isOpen={Boolean(selectedTaskId)}
        onClose={() => setSelectedTaskId(null)}
        task={selectedTask}
        onStart={handleStartTask}
      />

      <TaskAlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onAccept={() => { setShowAlert(false); /* proceed to flow */ }}
        onDecline={() => setShowAlert(false)}
        pickUp={alertPickUp}
        dropOff={alertDropOff}
      />
    </div>
  );
};

export default DispatchTasks;
