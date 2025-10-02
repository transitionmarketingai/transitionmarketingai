'use client';

import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  action?: string;
  video?: { title: string; duration: string; thumbnail?: string };
  completed: boolean;
  category: string;
  subTasks?: number;
}

const initialTasks: Task[] = [
  {
    id: 'start-essentials',
    title: 'Start with the essentials',
    completed: true,
    category: 'essentials',
    subTasks: 3,
    action: 'dropdown'
  },
  {
    id: 'add-first-contact',
    title: 'Add your first contact',
    description: 'Enter essential details about an individual or organization to link them to deals and activities.',
    action: 'Add contact',
    completed: false,
    category: 'essentials',
    video: { title: 'Building Relationships', duration: '4:55' }
  },
  {
    id: 'schedule-first-activity',
    title: 'Schedule your first activity',
    description: 'Arrange the details of a call, meeting or task to advance a deal.',
    action: 'Schedule activity',
    completed: false,
    category: 'essentials',
    video: { title: 'Managing Activities', duration: '5:40' }
  },
  {
    id: 'add-first-deal',
    title: 'Add your first deal',
    description: 'Create an opportunity and track its journey in your pipeline.',
    action: 'Add deal',
    completed: false,
    category: 'essentials',
    video: { title: 'Deal Pipeline', duration: '2:33' }
  },
  {
    id: 'customize-pipedrive',
    title: 'Customize Transition CRM using your own data',
    completed: false,
    category: 'customization',
    subTasks: 3,
    action: 'dropdown'
  },
  {
    id: 'improve-communication',
    title: 'Improve customer communication',
    completed: false,
    category: 'communication',
    subTasks: 3,
    action: 'dropdown'
  },
  {
    id: 'optimize-automation',
    title: 'Optimize and automate your sales process',
    completed: false,
    category: 'automation',
    subTasks: 2,
    action: 'dropdown'
  },
  {
    id: 'get-more-leads',
    title: 'Get more leads',
    completed: false,
    category: 'leads',
    subTasks: 2,
    action: 'dropdown'
  },
  {
    id: 'bring-team',
    title: 'Bring your team into Transition CRM',
    completed: false,
    category: 'team',
    subTasks: 1,
    action: 'dropdown'
  },
  {
    id: 'track-performance',
    title: 'Track sales performance',
    completed: false,
    category: 'analytics',
    subTasks: 1,
    action: 'dropdown'
  },
  {
    id: 'use-pulse',
    title: 'Identify priorities and take actions using Pulse',
    completed: false,
    category: 'priority',
    subTasks: 1,
    action: 'dropdown'
  },
  {
    id: 'learn-basics',
    title: 'Learn the basics with Transition Academy and live webinars',
    completed: false,
    category: 'education',
    subTasks: 2,
    action: 'dropdown'
  },
  {
    id: 'get-mobile-app',
    title: 'Get the Transition CRM mobile app',
    completed: false,
    category: 'mobile',
    subTasks: 1,
    action: 'dropdown'
  }
];

const taskCategories = {
  essentials: { label: 'SUGGESTED FOR YOU', color: 'text-gray-900' },
  customization: { label: 'SUGGESTED FOR YOU', color: 'text-gray-900' },
  communication: { label: 'SUGGESTED FOR YOU', color: 'text-gray-900' },
  automation: { label: 'SUGGESTED FOR YOU', color: 'text-gray-900' },
  leads: { label: 'SUGGESTED FOR YOU', color: 'text-gray-900' },
  team: { label: 'BROADEN YOUR EXPERIENCE', color: 'text-gray-900' },
  analytics: { label: 'BROADEN YOUR EXPERIENCE', color: 'text-gray-900' },
  priority: { label: 'BROADEN YOUR EXPERIENCE', color: 'text-gray-900' },
  education: { label: 'BROADEN YOUR EXPERIENCE', color: 'text-gray-900' },
  mobile: { label: 'BROADEN YOUR EXPERIENCE', color: 'text-gray-900' }
};

export default function SetupGuide() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const groupedTasks = tasks.reduce((groups, task) => {
    const category = taskCategories[task.category as keyof typeof taskCategories];
    if (!groups[category.label]) {
      groups[category.label] = [];
    }
    groups[category.label].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your personalized experience
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Get started with your Transition CRM experience. Complete the tasks to unlock your maximum Transition CRM potential!
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="bg-gray-200 rounded-full h-2 w-full max-w-md">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completedTasks}/{totalTasks} SUGGESTED TASKS COMPLETED
              </p>
            </div>
          </div>

          {/* Decorative Graphic */}
          <div className="flex-shrink-0 ml-8">
            <div className="w-64 h-40 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform rotate-3"></div>
              <div className="absolute top-8 left-8 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold">
                ✨
              </div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-blue-600 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Sections */}
      {Object.entries(groupedTasks).map(([categoryLabel, categoryTasks]) => (
        <div key={categoryLabel} className="mb-12">
          <h2 className={`text-sm font-bold uppercase tracking-wide mb-6 ${taskCategories[Object.keys(taskCategories).find(k => taskCategories[k as keyof typeof taskCategories].label === categoryLabel) as keyof typeof taskCategories]?.color || 'text-gray-900'}`}>
            {categoryLabel}
          </h2>

          <div className="space-y-2">
            {categoryTasks.map(task => (
              <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  {/* Left side */}
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => task.subTasks ? toggleExpand(task.id) : toggleTask(task.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : task.subTasks 
                            ? 'border-gray-300 hover:border-gray-400' 
                            : 'border-green-500 hover:bg-green-500 hover:text-white'
                      } transition-colors`}
                    >
                      {task.completed && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                      {!task.completed && task.subTasks && (
                        <svg className={`w-4 h-4 transition-transform ${expandedTasks.has(task.id) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {task.id === 'add-first-contact' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                        )}
                        {task.id === 'schedule-first-activity' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 014 0v4m-6 0h1m8 0h1m-1 0V5a2 2 0 00-4 0v2m-6 0h8"></path>
                            </svg>
                          </div>
                        )}
                        {task.id === 'add-first-deal' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                          </div>
                        )}
                        
                        <div>
                          {/* Title column */}
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                            {task.subTasks && (
                              <span className="text-sm text-gray-500">
                                {task.completed ? task.subTasks : 0} of {task.subTasks} tasks
                              </span>
                            )}
                          </div>
                          
                          {task.description && (
                            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      {task.action && task.action !== 'dropdown' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          {task.action}
                        </button>
                      )}
                      
                      {task.video && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"></path>
                              </svg>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                              {task.video.duration}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{task.video.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Chat Button */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.934-1.48a8.99 8.99 0 01-3.066-3.066A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
          </svg>
          Chat with us
        </button>
      </div>
    </div>
  );
}
