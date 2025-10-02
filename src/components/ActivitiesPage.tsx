'use client';

import React, { useState } from 'react';

interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'task' | 'deadline' | 'email' | 'lunch';
  subject: string;
  deal: string;
  contact: string;
  email: string;
  phone: string;
  organization: string;
  dueDate: string;
  assignedTo: string;
  done: boolean;
}

const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    subject: '[Sample] Collaboration Platform',
    deal: '[Sample] Benjamin Leon Co',
    contact: '[Sample] Benjamin Leon',
    email: 'benjamin.leon@gmail.com (Work)',
    phone: '785-202-7824',
    organization: '[Sample] Leon Digital Syste',
    dueDate: 'October 2',
    assignedTo: 'Transition Marketing',
    done: false
  },
  {
    id: '2',
    type: 'meeting',
    subject: '[Sample] Infrastructure Sec...',
    deal: '[Sample] Tony Turner IT Infi',
    contact: '[Sample] Tony Turner',
    email: 'tony.turner@moveer.com (Work)',
    phone: '218-348-8528',
    organization: '[Sample] MoveEr Tech Grou',
    dueDate: 'October 4',
    assignedTo: 'Transition Marketing',
    done: false
  }
];

const activityTypes = [
  { id: 'all', label: 'All', icon: 'All' },
  { id: 'call', label: 'Call', icon: '📞' },
  { id: 'meeting', label: 'Meeting', icon: '👥' },
  { id: 'task', label: 'Task', icon: '⏰' },
  { id: 'deadline', label: 'Deadline', icon: '🚩' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'lunch', label: 'Lunch', icon: '🍽️' }
];

const timeFilters = [
  { id: 'todo', label: 'To-do' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'thisweek', label: 'This week' },
  { id: 'nextweek', label: 'Next week' },
  { id: 'select', label: 'Select period' }
];

export default function ActivitiesPage() {
  const [showCalendarBanner, setShowCalendarBanner] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [selectedActivityType, setSelectedActivityType] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('todo');
  const [activities] = useState<Activity[]>(sampleActivities);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return '📞';
      case 'meeting': return '👥';
      case 'task': return '⏰';
      case 'deadline': return '🚩';
      case 'email': return '📧';
      case 'lunch': return '🍽️';
      default: return '📅';
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (selectedActivityType !== 'all' && activity.type !== selectedActivityType) {
      return false;
    }
    // Add more filtering logic based on selectedTimeFilter here
    return true;
  });

  return (
    <div className="max-w-full mx-auto h-full flex flex-col">
      {/* Calendar Sync Banner */}
      {showCalendarBanner && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 014 0v4m-6 0h1m8 0h1m-1 0V5a2 2 0 00-4 0v2m-6 0h8"></path>
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900">Set up calendar sync to never miss an important event</h3>
              <p className="text-sm text-blue-700">Enable calendar sync to seamlessly sync your external calendar with Transition CRM.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Open calendar sync
            </button>
            <button
              onClick={() => setShowCalendarBanner(false)}
              className="text-blue-500 hover:text-blue-700 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* View Options */}
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded ${activeView === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </button>
              <button
                onClick={() => setActiveView('calendar')}
                className={`p-2 rounded ${activeView === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 014 0v4m-6 0h6m-6 4l6 0m-6 4l6 0m-6 4l6 0m8 0V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path>
                </svg>
              </button>
            </div>

            {/* Add Activity Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              + Activity
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 014 0v4m-6 0h1m8 0h1m-1 0V5a2 2 0 00-4 0v2m-6 0h8"></path>
              </svg>
              Meeting scheduler
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{activities.length} activities</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <button className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium">
              SYNC INACTIVE
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm">Filter</button>
            <button className="text-gray-500 hover:text-gray-700 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5 19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Activity Type Filters */}
        <div className="flex items-center space-x-2 mb-4">
          {activityTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedActivityType(type.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedActivityType === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{type.id !== 'all' ? type.icon : 'All'}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Time Filters */}
        <div className="flex items-center space-x-2">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedTimeFilter(filter.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedTimeFilter === filter.id
                  ? `bg-blue-600 text-white`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Table */}
      <div className="flex-1 bg-white overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Done
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned to user
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="radio"
                      name={`done-${activity.id}`}
                      checked={activity.done}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                      <span className="text-sm font-medium text-gray-900">{activity.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.deal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* Priority would be displayed here */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.organization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* Duration would be displayed here */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 014 0v4m-6 0h6m-6 4l6 0m-6 4l6 0m-6 4l6 0m8 0V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new activity.</p>
          </div>
        )}
      </div>
    </div>
  );
}
