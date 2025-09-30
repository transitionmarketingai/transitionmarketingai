"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getLeads, getContent, getCampaigns, getAnalytics, addLead, addContent, type Lead, type Content, type Campaign, type Analytics } from "@/lib/supabaseDataService";

// Enhanced mock data for the dashboard
const mockStats = {
  leads: {
    total: 1247,
    thisMonth: 89,
    conversion: 12.3,
    trend: "+8.2%",
    qualified: 156,
    contacted: 89,
    new: 23
  },
  content: {
    blogs: 12,
    socialPosts: 28,
    newsletters: 4,
    engagement: 15.7,
    totalViews: 2847,
    avgEngagement: 8.3
  },
  revenue: {
    monthly: 156000,
    growth: "+23.1%",
    mrr: 52000,
    ltv: 125000,
    churn: 2.1
  },
  performance: {
    responseRate: 18.5,
    openRate: 24.7,
    clickRate: 6.2,
    conversionRate: 12.3
  }
};

const recentLeads = [
  { id: 1, name: "Rajesh Kumar", company: "TechCorp India", status: "Qualified", source: "LinkedIn", date: "2025-01-15" },
  { id: 2, name: "Priya Sharma", company: "StartupXYZ", status: "Contacted", source: "Email", date: "2025-01-14" },
  { id: 3, name: "Amit Patel", company: "Digital Solutions", status: "New", source: "Website", date: "2025-01-14" },
  { id: 4, name: "Sneha Reddy", company: "E-commerce Plus", status: "Qualified", source: "WhatsApp", date: "2025-01-13" },
  { id: 5, name: "Vikram Singh", company: "CloudTech", status: "Contacted", source: "LinkedIn", date: "2025-01-13" }
];

const recentContent = [
  { id: 1, title: "AI Marketing Trends 2025", type: "Blog", status: "Published", views: 1247, date: "2025-01-15" },
  { id: 2, title: "LinkedIn Post - Lead Generation Tips", type: "Social", status: "Published", views: 892, date: "2025-01-14" },
  { id: 3, title: "Weekly Newsletter - Industry Insights", type: "Newsletter", status: "Scheduled", views: 0, date: "2025-01-16" },
  { id: 4, title: "SEO Best Practices for SMBs", type: "Blog", status: "Draft", views: 0, date: "2025-01-12" }
];

// Enhanced Dashboard Components
function StatCard({ title, value, subtitle, trend, icon, color = "primary" }: {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  icon: string;
  color?: "primary" | "success" | "warning" | "danger";
}) {
  const colorClasses = {
    primary: "text-cyan-500",
    success: "text-green-500", 
    warning: "text-yellow-500",
    danger: "text-red-500"
  };

  return (
    <div className="card hover-lift group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-body-sm text-secondary font-medium">{title}</h3>
        <div className={`text-3xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold text-primary mb-3">{value}</div>
      {subtitle && <div className="text-body-sm text-secondary mb-3">{subtitle}</div>}
      {trend && (
        <div className="flex items-center text-body-sm">
          <span className={`${colorClasses[color]} font-medium`}>{trend}</span>
          <span className="text-secondary ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h3 className="text-heading-4 text-primary mb-6">{title}</h3>
      {children}
    </div>
  );
}

function ProgressBar({ value, max = 100, color = "primary" }: { value: number; max?: number; color?: string }) {
  const percentage = (value / max) * 100;
  const colorClasses = {
    primary: "bg-gradient-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500"
  };

  return (
    <div className="w-full bg-surface-elevated rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Advanced search and filter component
function SearchAndFilter({ 
  onSearch, 
  onFilter, 
  placeholder = "Search...",
  filterOptions = []
}: { 
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  placeholder?: string;
  filterOptions?: { key: string; label: string; options: { value: string; label: string }[] }[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="card mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-subtle bg-surface text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Dropdowns */}
        {filterOptions.map((filter) => (
          <div key={filter.key} className="min-w-[150px]">
            <select
              value={filters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Clear Filters */}
        {(searchQuery || Object.keys(filters).length > 0) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({});
              onSearch('');
              onFilter({});
            }}
            className="px-4 py-3 rounded-lg border border-subtle bg-surface text-secondary hover:text-primary transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

function TableCard({ 
  title, 
  data, 
  columns, 
  searchable = false,
  filterable = false,
  filterOptions = []
}: {
  title: string;
  data: any[];
  columns: { key: string; label: string; render?: (value: any, row: any) => React.ReactNode }[];
  searchable?: boolean;
  filterable?: boolean;
  filterOptions?: { key: string; label: string; options: { value: string; label: string }[] }[];
}) {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(data, query, filters);
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(data, searchQuery, newFilters);
  };

  const applyFilters = (dataToFilter: any[], query: string, activeFilters: any) => {
    let filtered = dataToFilter;

    // Apply search
    if (query) {
      filtered = filtered.filter(item =>
        columns.some(column => {
          const value = item[column.key];
          return value && value.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
    }

    // Apply filters
    Object.keys(activeFilters).forEach(key => {
      if (activeFilters[key]) {
        filtered = filtered.filter(item => item[key] === activeFilters[key]);
      }
    });

    setFilteredData(filtered);
  };

  return (
    <div className="card">
      <h3 className="text-heading-4 text-primary mb-6">{title}</h3>
      
      {/* Search and Filter */}
      {(searchable || filterable) && (
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder={`Search ${title.toLowerCase()}...`}
          filterOptions={filterOptions}
        />
      )}

      {/* Results Count */}
      <div className="mb-4 text-body-sm text-secondary">
        Showing {filteredData.length} of {data.length} results
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-subtle">
              {columns.map((column) => (
                <th key={column.key} className="text-left py-3 px-4 text-body-sm text-secondary font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-subtle/50 hover:bg-surface/50">
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4 text-body">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-secondary">
          <div className="text-4xl mb-4">🔍</div>
          <p>No results found</p>
          <p className="text-body-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'qualified':
        return 'bg-green-500/20 text-green-400';
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400';
      case 'new':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'published':
        return 'bg-green-500/20 text-green-400';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

// Simple chart component
function SimpleChart({ data, type = "line" }: { data: { label: string; value: number; color?: string }[]; type?: "line" | "bar" | "pie" }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (type === "bar") {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-body-sm text-secondary">{item.label}</div>
            <div className="flex-1 bg-surface-elevated rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${item.color || 'bg-gradient-primary'}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-16 text-body-sm text-primary font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === "pie") {
    return (
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100;
              const offset = data.slice(0, index).reduce((sum, d) => sum + (d.value / data.reduce((s, di) => s + di.value, 0)) * 100, 0);
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((offset / 100) * circumference);
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color || 'var(--color-primary)'}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-body font-bold text-primary">
              {data.reduce((sum, d) => sum + d.value, 0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  // Line chart
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-body-sm text-secondary">
        <span>0</span>
        <span>{maxValue}</span>
      </div>
      <div className="relative h-20 bg-surface-elevated rounded-lg p-2">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            points={data.map((item, index) => 
              `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 100}`
            ).join(' ')}
            className="transition-all duration-500"
          />
          {data.map((item, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 100}
              cy={100 - (item.value / maxValue) * 100}
              r="2"
              fill="var(--color-primary)"
              className="transition-all duration-500"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-body-sm text-secondary">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

// Skeleton loading component
function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-surface-elevated rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-surface-elevated rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-surface-elevated rounded w-1/3"></div>
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Error boundary component
function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card border-red-500/20 bg-red-500/10">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-body text-red-400">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-secondary text-sm px-4 py-2"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

// Success message component
function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="card border-green-500/20 bg-green-500/10">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-body text-green-400">{message}</p>
      </div>
    </div>
  );
}

// Widget component
function Widget({ 
  title, 
  children, 
  size = "medium", 
  onRemove, 
  onEdit,
  isDraggable = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  size?: "small" | "medium" | "large";
  onRemove?: () => void;
  onEdit?: () => void;
  isDraggable?: boolean;
}) {
  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-2 lg:col-span-3"
  };

  return (
    <div className={`card hover-lift group ${sizeClasses[size]} ${isDraggable ? 'cursor-move' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-4 text-primary">{title}</h3>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1 rounded hover:bg-surface-elevated transition-colors"
              aria-label="Edit widget"
            >
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1 rounded hover:bg-red-500/20 transition-colors"
              aria-label="Remove widget"
            >
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// Widget selector component
function WidgetSelector({ onAddWidget }: { onAddWidget: (widget: any) => void }) {
  const availableWidgets = [
    { id: 'revenue-chart', title: 'Revenue Chart', icon: '📈', description: 'Monthly revenue trends' },
    { id: 'lead-funnel', title: 'Lead Funnel', icon: '🎯', description: 'Lead conversion pipeline' },
    { id: 'top-content', title: 'Top Content', icon: '📝', description: 'Best performing content' },
    { id: 'team-activity', title: 'Team Activity', icon: '👥', description: 'Recent team actions' },
    { id: 'goals-progress', title: 'Goals Progress', icon: '🎯', description: 'Monthly goals tracking' },
    { id: 'quick-actions', title: 'Quick Actions', icon: '⚡', description: 'Common actions panel' }
  ];

  return (
    <div className="card">
      <h3 className="text-heading-4 text-primary mb-4">Add Widgets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableWidgets.map((widget) => (
          <button
            key={widget.id}
            onClick={() => onAddWidget(widget)}
            className="p-3 rounded-lg border border-subtle hover:bg-surface-elevated transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{widget.icon}</span>
              <div>
                <div className="text-body font-medium text-primary">{widget.title}</div>
                <div className="text-body-sm text-secondary">{widget.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Notification component
function Notification({ notification, onDismiss }: { notification: any; onDismiss: () => void }) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10';
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10';
      default:
        return 'border-blue-500/20 bg-blue-500/10';
    }
  };

  return (
    <div className={`card border ${getNotificationColor(notification.type)} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-body font-medium text-primary">{notification.title}</h4>
          <p className="text-body-sm text-secondary mt-1">{notification.message}</p>
          <p className="text-body-sm text-muted mt-2">{notification.time}</p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-surface-elevated transition-colors"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Notification center component
function NotificationCenter({ notifications, onDismissAll }: { notifications: any[]; onDismissAll: () => void }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-4 text-primary">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={onDismissAll}
            className="text-body-sm text-secondary hover:text-primary transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-secondary">
          <div className="text-4xl mb-4">🔔</div>
          <p>No notifications</p>
          <p className="text-body-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
              onDismiss={() => {
                // This would be handled by the parent component
                console.log('Dismiss notification:', notification.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Theme toggle component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Initialize theme on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [customWidgets, setCustomWidgets] = useState<any[]>([]);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Real data state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'campaigns', label: 'Campaigns', icon: '🚀' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [leadsData, contentData, campaignsData, analyticsData] = await Promise.all([
          getLeads(),
          getContent(),
          getCampaigns(),
          getAnalytics()
        ]);

        setLeads(leadsData);
        setContent(contentData);
        setCampaigns(campaignsData);
        setAnalytics(analyticsData);

        // Initialize notifications
        setNotifications([
          {
            id: 1,
            type: 'success',
            title: 'New Lead Generated',
            message: 'Sarah Johnson from TechCorp has been added to your leads.',
            time: '2 minutes ago'
          },
          {
            id: 2,
            type: 'info',
            title: 'Content Published',
            message: 'Your blog post "AI Marketing Trends 2024" is now live.',
            time: '1 hour ago'
          },
          {
            id: 3,
            type: 'warning',
            title: 'Campaign Performance',
            message: 'Email campaign open rates are below target this week.',
            time: '3 hours ago'
          }
        ]);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Real-time updates
  useEffect(() => {
    // Real-time updates will be handled by Supabase subscriptions
    const stopUpdates = () => {
      // Cleanup function for real-time subscriptions
    };

    return stopUpdates;
  }, []);

  const handleAddWidget = (widget: any) => {
    setCustomWidgets(prev => [...prev, { ...widget, id: `${widget.id}-${Date.now()}` }]);
    setShowWidgetSelector(false);
    setSuccess(`Added ${widget.title} widget!`);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setCustomWidgets(prev => prev.filter(w => w.id !== widgetId));
    setSuccess('Widget removed successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  // Functional handlers
  const handleAddLead = async () => {
    try {
      const newLead = await addLead({
        name: 'New Lead',
        company: 'New Company',
        email: `lead${Date.now()}@example.com`,
        status: 'new',
        source: 'Website',
        score: 75
      });
      
      if (newLead) {
        setLeads(prev => [newLead, ...prev]);
      }
      setSuccess('New lead added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add lead');
    }
  };

  const handleAddContent = async () => {
    try {
      const newContent = await addContent({
        title: 'New Content Piece',
        type: 'Blog',
        status: 'draft',
        views: 0,
        engagement: 0
      });
      
      if (newContent) {
        setContent(prev => [newContent, ...prev]);
      }
      setSuccess('New content created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to create content');
    }
  };

  const renderCustomWidget = (widget: any) => {
    switch (widget.id.split('-')[0]) {
      case 'revenue':
        return (
          <SimpleChart 
            data={[
              { label: 'Jan', value: 12000 },
              { label: 'Feb', value: 15000 },
              { label: 'Mar', value: 18000 },
              { label: 'Apr', value: 22000 },
              { label: 'May', value: 28000 },
              { label: 'Jun', value: 32000 }
            ]}
            type="line"
          />
        );
      case 'lead':
        return (
          <SimpleChart 
            data={[
              { label: 'Leads', value: 1000, color: 'bg-gradient-primary' },
              { label: 'Qualified', value: 300, color: 'bg-green-500' },
              { label: 'Converted', value: 150, color: 'bg-cyan-500' }
            ]}
            type="bar"
          />
        );
      case 'top':
        return (
          <div className="space-y-3">
            {[
              { title: 'AI Marketing Guide', views: 2847, type: 'Blog' },
              { title: 'Lead Generation Tips', views: 1923, type: 'Blog' },
              { title: 'Content Strategy', views: 1654, type: 'Video' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-surface-elevated">
                <div>
                  <div className="text-body font-medium text-primary">{item.title}</div>
                  <div className="text-body-sm text-secondary">{item.type}</div>
                </div>
                <div className="text-body-sm text-secondary">{item.views} views</div>
              </div>
            ))}
          </div>
        );
      case 'team':
        return (
          <div className="space-y-3">
            {[
              { user: 'Sarah Chen', action: 'Created new campaign', time: '2 hours ago' },
              { user: 'Mike Johnson', action: 'Updated lead status', time: '4 hours ago' },
              { user: 'Lisa Wang', action: 'Published blog post', time: '6 hours ago' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded bg-surface-elevated">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{item.user.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1">
                  <div className="text-body-sm text-primary">{item.user}</div>
                  <div className="text-body-sm text-secondary">{item.action}</div>
                </div>
                <div className="text-body-sm text-secondary">{item.time}</div>
              </div>
            ))}
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-4">
            {[
              { goal: 'Monthly Leads', current: 450, target: 500, progress: 90 },
              { goal: 'Content Published', current: 12, target: 15, progress: 80 },
              { goal: 'Revenue Target', current: 28000, target: 30000, progress: 93 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-body-sm text-secondary">{item.goal}</span>
                  <span className="text-body-sm text-primary">{item.current}/{item.target}</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 'quick':
        return (
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Lead', icon: '➕', action: () => setSuccess('New lead created!') },
              { label: 'Create Content', icon: '📝', action: () => setSuccess('Content template opened!') },
              { label: 'Send Email', icon: '📧', action: () => setSuccess('Email composer opened!') },
              { label: 'View Reports', icon: '📊', action: () => setActiveTab('analytics') }
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="p-3 rounded-lg bg-surface-elevated hover:bg-surface transition-colors text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-body-sm text-primary">{item.label}</div>
              </button>
            ))}
          </div>
        );
      default:
        return <div className="text-body text-secondary">Widget content not available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-subtle transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-subtle">
            <Link href="/" className="text-heading-4 text-primary font-bold">
              Transition AI
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setActiveTab(item.id);
                    setIsLoading(false);
                  }, 500);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-secondary hover:text-primary hover:bg-surface-elevated'
                }`}
                aria-current={activeTab === item.id ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
              >
                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-subtle">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface-elevated">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover-float">
                <span className="text-white text-sm font-medium">DU</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">Demo User</p>
                <p className="text-xs text-secondary truncate">demo@transitionai.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-subtle">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-heading-3 text-primary">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-body-sm text-secondary">
                  {activeTab === 'overview' ? 'Welcome back! Here\'s what\'s happening today.' : 
                   activeTab === 'leads' ? 'Manage your leads and track conversions' :
                   activeTab === 'content' ? 'Create and manage your content' :
                   activeTab === 'analytics' ? 'View detailed analytics and reports' :
                   activeTab === 'campaigns' ? 'Manage your marketing campaigns' :
                   'Configure your account settings'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {activeTab === 'overview' && (
                <button 
                  onClick={() => setShowWidgetSelector(!showWidgetSelector)}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  {showWidgetSelector ? 'Cancel' : 'Add Widgets'}
                </button>
              )}
              <ThemeToggle />
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-surface-elevated transition-colors relative" 
                  aria-label="Notifications"
                >
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 13h6V7H4v6zM4 1h6v6H4V1z" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-subtle rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-heading-4 text-primary">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={() => setNotifications([])}
                            className="text-body-sm text-secondary hover:text-primary transition-colors"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-secondary">
                          <div className="text-4xl mb-4">🔔</div>
                          <p>No notifications</p>
                          <p className="text-body-sm">You're all caught up!</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {notifications.map((notification, index) => (
                            <Notification
                              key={index}
                              notification={notification}
                              onDismiss={() => {
                                setNotifications(prev => prev.filter(n => n.id !== notification.id));
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 rounded-lg hover:bg-surface-elevated transition-colors" aria-label="Settings">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <ErrorMessage 
                message={error} 
                onRetry={() => {
                  setError(null);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }} 
              />
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div className="mb-6">
              <SuccessMessage message={success} />
            </div>
          )}
          
          {isLoading ? (
            <LoadingState />
          ) : activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Widget Selector */}
              {showWidgetSelector && (
                <div className="mb-8">
                  <WidgetSelector onAddWidget={handleAddWidget} />
                </div>
              )}

              {/* Custom Widgets Grid */}
              {customWidgets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {customWidgets.map((widget) => (
                    <Widget
                      key={widget.id}
                      title={widget.title}
                      size="medium"
                      onRemove={() => handleRemoveWidget(widget.id)}
                      onEdit={() => setSuccess(`Editing ${widget.title}...`)}
                    >
                      {renderCustomWidget(widget)}
                    </Widget>
                  ))}
                </div>
              )}

              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Leads"
                  value={analytics?.leads.total.toString() || "0"}
                  subtitle={`${analytics?.leads.new || 0} new this month`}
                  trend="+12%"
                  icon="🎯"
                  color="primary"
                />
                <StatCard
                  title="Conversion Rate"
                  value={`${mockStats.leads.conversion}%`}
                  subtitle="Lead to customer"
                  trend="+2.1%"
                  icon="📈"
                  color="success"
                />
                <StatCard
                  title="Monthly Revenue"
                  value={`₹${mockStats.revenue.monthly.toLocaleString()}`}
                  subtitle={`MRR: ₹${mockStats.revenue.mrr.toLocaleString()}`}
                  trend={mockStats.revenue.growth}
                  icon="💰"
                  color="success"
                />
                <StatCard
                  title="Content Views"
                  value={mockStats.content.totalViews.toLocaleString()}
                  subtitle={`${mockStats.content.blogs} blogs, ${mockStats.content.socialPosts} social`}
                  trend="+15.3%"
                  icon="📝"
                  color="primary"
                />
              </div>

              {/* Secondary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Response Rate"
                  value={`${mockStats.performance.responseRate}%`}
                  subtitle="Email & WhatsApp"
                  trend="+1.2%"
                  icon="💬"
                  color="primary"
                />
                <StatCard
                  title="Open Rate"
                  value={`${mockStats.performance.openRate}%`}
                  subtitle="Email campaigns"
                  trend="+0.8%"
                  icon="📧"
                  color="success"
                />
                <StatCard
                  title="LTV"
                  value={`₹${mockStats.revenue.ltv.toLocaleString()}`}
                  subtitle="Customer lifetime value"
                  trend="+5.2%"
                  icon="💎"
                  color="success"
                />
                <StatCard
                  title="Churn Rate"
                  value={`${mockStats.revenue.churn}%`}
                  subtitle="Monthly churn"
                  trend="-0.3%"
                  icon="📉"
                  color="warning"
                />
              </div>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Lead Sources Performance">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">LinkedIn</span>
                        <span className="text-body font-medium text-primary">45%</span>
                      </div>
                      <ProgressBar value={45} color="primary" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">Email</span>
                        <span className="text-body font-medium text-primary">30%</span>
                      </div>
                      <ProgressBar value={30} color="success" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">Website</span>
                        <span className="text-body font-medium text-primary">15%</span>
                      </div>
                      <ProgressBar value={15} color="warning" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">WhatsApp</span>
                        <span className="text-body font-medium text-primary">10%</span>
                      </div>
                      <ProgressBar value={10} color="danger" />
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Content Performance">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">Blog Posts</span>
                        <span className="text-body font-medium text-primary">2,847 views</span>
                      </div>
                      <ProgressBar value={85} color="primary" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">Social Posts</span>
                        <span className="text-body font-medium text-primary">1,923 views</span>
                      </div>
                      <ProgressBar value={65} color="success" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-body text-secondary">Newsletters</span>
                        <span className="text-body font-medium text-primary">892 opens</span>
                      </div>
                      <ProgressBar value={45} color="warning" />
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TableCard
                  title="Recent Leads"
                  data={recentLeads}
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'company', label: 'Company' },
                    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
                    { key: 'source', label: 'Source' },
                    { key: 'date', label: 'Date' }
                  ]}
                />
                
                <TableCard
                  title="Recent Content"
                  data={recentContent}
                  columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'type', label: 'Type' },
                    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
                    { key: 'views', label: 'Views' },
                    { key: 'date', label: 'Date' }
                  ]}
                />
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-heading-4 text-primary mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="btn-primary text-center py-4">
                    <div className="text-2xl mb-2">🎯</div>
                    Generate New Leads
                  </button>
                  <button className="btn-secondary text-center py-4">
                    <div className="text-2xl mb-2">📝</div>
                    Create Content
                  </button>
                  <button className="btn-secondary text-center py-4">
                    <div className="text-2xl mb-2">📊</div>
                    View Analytics
                  </button>
                  <button className="btn-secondary text-center py-4">
                    <div className="text-2xl mb-2">⚙️</div>
                    Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-heading-2 text-primary">Lead Management</h2>
                  <p className="text-body text-secondary mt-2">Track and manage your leads across all channels</p>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleAddLead}
                >
                  Add New Lead
                </button>
              </div>
              
              <TableCard
                title="All Leads"
                data={leads}
                searchable={true}
                filterable={true}
                filterOptions={[
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { value: 'new', label: 'New' },
                      { value: 'contacted', label: 'Contacted' },
                      { value: 'qualified', label: 'Qualified' }
                    ]
                  },
                  {
                    key: 'source',
                    label: 'Source',
                    options: [
                      { value: 'LinkedIn', label: 'LinkedIn' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Website', label: 'Website' },
                      { value: 'Referral', label: 'Referral' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'company', label: 'Company' },
                  { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
                  { key: 'source', label: 'Source' },
                  { key: 'date', label: 'Date' }
                ]}
              />
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-heading-2 text-primary">Content Management</h2>
                  <p className="text-body text-secondary mt-2">Create and manage your content across all platforms</p>
                </div>
                <button className="btn-primary" onClick={handleAddContent}>Create New Content</button>
              </div>
              
              <TableCard
                title="All Content"
                data={content}
                searchable={true}
                filterable={true}
                filterOptions={[
                  {
                    key: 'type',
                    label: 'Type',
                    options: [
                      { value: 'Blog', label: 'Blog' },
                      { value: 'Social', label: 'Social' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Video', label: 'Video' }
                    ]
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { value: 'draft', label: 'Draft' },
                      { value: 'scheduled', label: 'Scheduled' },
                      { value: 'published', label: 'Published' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'title', label: 'Title' },
                  { key: 'type', label: 'Type' },
                  { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
                  { key: 'views', label: 'Views' },
                  { key: 'date', label: 'Date' }
                ]}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-heading-2 text-primary">Analytics & Reports</h2>
                  <p className="text-body text-secondary mt-2">Detailed insights into your marketing performance</p>
                </div>
                <div className="flex space-x-3">
                  <select className="px-4 py-2 rounded-lg border border-subtle bg-surface text-primary">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                  <button className="btn-primary">Export Report</button>
                </div>
              </div>
              
              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Conversion Rate"
                  value="12.4%"
                  trend="+2.1%"
                  icon="📈"
                  color="success"
                />
                <StatCard
                  title="Avg. Response Time"
                  value="2.3h"
                  trend="-0.5h"
                  icon="⏱️"
                  color="primary"
                />
                <StatCard
                  title="Cost per Lead"
                  value="₹45"
                  trend="-₹8"
                  icon="💰"
                  color="warning"
                />
                <StatCard
                  title="ROI"
                  value="340%"
                  trend="+45%"
                  icon="📊"
                  color="success"
                />
              </div>

              {/* Advanced Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Lead Sources Distribution">
                  <SimpleChart 
                    data={[
                      { label: 'LinkedIn', value: 45, color: 'var(--color-primary)' },
                      { label: 'Email', value: 30, color: 'var(--color-secondary)' },
                      { label: 'Website', value: 15, color: 'var(--color-accent)' },
                      { label: 'WhatsApp', value: 10, color: '#ef4444' }
                    ]}
                    type="pie"
                  />
                </ChartCard>
                
                <ChartCard title="Monthly Lead Trends">
                  <SimpleChart 
                    data={[
                      { label: 'Jan', value: 120 },
                      { label: 'Feb', value: 150 },
                      { label: 'Mar', value: 180 },
                      { label: 'Apr', value: 220 },
                      { label: 'May', value: 280 },
                      { label: 'Jun', value: 320 }
                    ]}
                    type="line"
                  />
                </ChartCard>
              </div>

              {/* Performance Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Top Performing Content</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'AI Marketing Guide', views: 2847, engagement: '12.4%', type: 'Blog' },
                      { title: 'Lead Generation Tips', views: 1923, engagement: '8.7%', type: 'Blog' },
                      { title: 'Content Strategy Video', views: 1654, engagement: '15.2%', type: 'Video' },
                      { title: 'Email Templates', views: 1432, engagement: '9.8%', type: 'Resource' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded bg-surface-elevated">
                        <div>
                          <div className="text-body font-medium text-primary">{item.title}</div>
                          <div className="text-body-sm text-secondary">{item.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-body-sm text-primary">{item.views} views</div>
                          <div className="text-body-sm text-secondary">{item.engagement} engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Campaign Performance</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Q4 Email Campaign', sent: 2500, opened: 625, clicked: 156, converted: 23 },
                      { name: 'LinkedIn Outreach', sent: 800, opened: 320, clicked: 64, converted: 12 },
                      { name: 'Content Marketing', sent: 1200, opened: 480, clicked: 96, converted: 18 },
                      { name: 'Webinar Series', sent: 600, opened: 180, clicked: 54, converted: 8 }
                    ].map((campaign, index) => (
                      <div key={index} className="p-3 rounded bg-surface-elevated">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-body font-medium text-primary">{campaign.name}</div>
                          <div className="text-body-sm text-secondary">
                            {((campaign.converted / campaign.sent) * 100).toFixed(1)}% conversion
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-body-sm">
                          <div className="text-center">
                            <div className="text-primary font-medium">{campaign.sent}</div>
                            <div className="text-secondary">Sent</div>
                          </div>
                          <div className="text-center">
                            <div className="text-primary font-medium">{campaign.opened}</div>
                            <div className="text-secondary">Opened</div>
                          </div>
                          <div className="text-center">
                            <div className="text-primary font-medium">{campaign.clicked}</div>
                            <div className="text-secondary">Clicked</div>
                          </div>
                          <div className="text-center">
                            <div className="text-primary font-medium">{campaign.converted}</div>
                            <div className="text-secondary">Converted</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Analytics Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Funnel Analysis</h3>
                  <div className="space-y-4">
                    {[
                      { stage: 'Awareness', count: 1000, percentage: 100 },
                      { stage: 'Interest', count: 450, percentage: 45 },
                      { stage: 'Consideration', count: 180, percentage: 18 },
                      { stage: 'Purchase', count: 72, percentage: 7.2 }
                    ].map((stage, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-body-sm text-secondary">{stage.stage}</span>
                          <span className="text-body-sm text-primary">{stage.count} ({stage.percentage}%)</span>
                        </div>
                        <div className="w-full bg-surface-elevated rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                            style={{ width: `${stage.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Geographic Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { location: 'Mumbai', leads: 320, percentage: 32 },
                      { location: 'Delhi', leads: 280, percentage: 28 },
                      { location: 'Bangalore', leads: 220, percentage: 22 },
                      { location: 'Chennai', leads: 180, percentage: 18 }
                    ].map((location, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-body-sm text-secondary">{location.location}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-surface-elevated rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-primary"
                              style={{ width: `${location.percentage}%` }}
                            />
                          </div>
                          <span className="text-body-sm text-primary w-12 text-right">{location.leads}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Time-based Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-body-sm text-secondary mb-2">Best Day of Week</div>
                      <div className="text-body font-medium text-primary">Tuesday (18.5% of leads)</div>
                    </div>
                    <div>
                      <div className="text-body-sm text-secondary mb-2">Best Time of Day</div>
                      <div className="text-body font-medium text-primary">10:00 AM - 12:00 PM</div>
                    </div>
                    <div>
                      <div className="text-body-sm text-secondary mb-2">Peak Season</div>
                      <div className="text-body font-medium text-primary">Q4 (35% of annual leads)</div>
                    </div>
                    <div>
                      <div className="text-body-sm text-secondary mb-2">Response Rate</div>
                      <div className="text-body font-medium text-primary">24.7% within 1 hour</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-heading-2 text-primary">Campaigns</h2>
                  <p className="text-body text-secondary mt-2">Manage your marketing campaigns and automation</p>
                </div>
                <button className="btn-primary">Create Campaign</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-4">Email Campaign</h3>
                  <p className="text-body text-secondary mb-4">Weekly newsletter to 2,500 subscribers</p>
                  <div className="flex justify-between items-center">
                    <span className="text-body-sm text-secondary">Status: Active</span>
                    <span className="text-body-sm text-green-400">24.7% open rate</span>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-4">LinkedIn Outreach</h3>
                  <p className="text-body text-secondary mb-4">Automated connection requests and follow-ups</p>
                  <div className="flex justify-between items-center">
                    <span className="text-body-sm text-secondary">Status: Active</span>
                    <span className="text-body-sm text-green-400">18.5% response rate</span>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-4">Content Calendar</h3>
                  <p className="text-body text-secondary mb-4">Automated social media posting schedule</p>
                  <div className="flex justify-between items-center">
                    <span className="text-body-sm text-secondary">Status: Active</span>
                    <span className="text-body-sm text-green-400">8.3% engagement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-heading-2 text-primary">Settings</h2>
                <p className="text-body text-secondary mt-2">Configure your account and preferences</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-body-sm font-medium text-secondary mb-2">Company Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface text-primary" defaultValue="Demo Company" />
                    </div>
                    <div>
                      <label className="block text-body-sm font-medium text-secondary mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface text-primary" defaultValue="demo@transitionai.com" />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-heading-4 text-primary mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body">Email notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-cyan-500" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body">SMS alerts</span>
                      <input type="checkbox" className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body">Weekly reports</span>
                      <input type="checkbox" className="w-4 h-4 text-cyan-500" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}
