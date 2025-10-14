'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, DollarSign, Target, Users, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';

const LEADS_TREND = [
  { month: 'Jan', leads: 45, qualified: 23 },
  { month: 'Feb', leads: 62, qualified: 34 },
  { month: 'Mar', leads: 87, qualified: 51 },
  { month: 'Apr', leads: 93, qualified: 58 },
];

const CONVERSION_DATA = [
  { stage: 'New', count: 93 },
  { stage: 'Contacted', count: 72 },
  { stage: 'Qualified', count: 58 },
  { stage: 'Meeting', count: 34 },
  { stage: 'Won', count: 12 },
];

const SOURCE_DATA = [
  { name: 'Facebook', value: 45, color: '#3B82F6' },
  { name: 'Instagram', value: 23, color: '#EC4899' },
  { name: 'Google', value: 18, color: '#EF4444' },
  { name: 'AI Search', value: 32, color: '#8B5CF6' },
  { name: 'Outreach', value: 28, color: '#10B981' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-indigo-600" />
          Analytics & Reports
        </h1>
        <p className="text-gray-600 mt-1">Track performance and conversion metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
              Total Leads
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">146</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +23% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
              Conversion Rate
              <Target className="h-4 w-4 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">62%</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +5% improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
              Avg Quality Score
              <Users className="h-4 w-4 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84</div>
            <div className="text-xs text-gray-500 mt-1">Out of 100</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
              Cost per Lead
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹128</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              -12% reduced
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Lead Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Generation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={LEADS_TREND}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Total Leads" />
                <Line type="monotone" dataKey="qualified" stroke="#10B981" strokeWidth={2} name="Qualified" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CONVERSION_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Source Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="w-1/2 space-y-3">
              {SOURCE_DATA.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{source.value}</div>
                    <div className="text-xs text-gray-500">{Math.round((source.value / 146) * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

