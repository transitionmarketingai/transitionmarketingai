'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
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
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react';
import { formatIndianCurrency } from '@/types/india-leadgen';

const COLORS = {
  hot: '#ef4444',
  warm: '#f59e0b',
  qualified: '#3b82f6',
  cold: '#6b7280',
};

interface AnalyticsProps {
  customerId?: string;
  dateRange?: { start: Date; end: Date };
}

export function LeadAnalytics({ customerId, dateRange }: AnalyticsProps) {
  const [qualityDistribution, setQualityDistribution] = useState<any[]>([]);
  const [sourcePerformance, setSourcePerformance] = useState<any[]>([]);
  const [dailyLeads, setDailyLeads] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [customerId, dateRange]);

  async function loadAnalytics() {
    const supabase = createClient();

    try {
      // Get quality distribution
      const { data: qualityData } = await supabase
        .rpc('get_lead_quality_distribution', {
          p_start_date: dateRange?.start.toISOString().split('T')[0],
          p_end_date: dateRange?.end.toISOString().split('T')[0]
        });

      if (qualityData) {
        setQualityDistribution(
          qualityData.map((d: any) => ({
            name: d.quality_range,
            value: parseInt(d.lead_count),
            percentage: parseFloat(d.percentage)
          }))
        );
      }

      // Get source performance
      const { data: sourceData } = await supabase
        .rpc('compare_lead_sources', {
          p_start_date: dateRange?.start.toISOString().split('T')[0],
          p_end_date: dateRange?.end.toISOString().split('T')[0]
        });

      if (sourceData) {
        setSourcePerformance(sourceData);
      }

      // Get daily leads trend
      const { data: dailyData } = await supabase
        .from('leads')
        .select('created_at, quality_score')
        .gte('created_at', dateRange?.start.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at');

      if (dailyData) {
        // Group by date
        const grouped = dailyData.reduce((acc: any, lead: any) => {
          const date = new Date(lead.created_at).toLocaleDateString('en-IN');
          if (!acc[date]) {
            acc[date] = { date, leads: 0, total_quality: 0 };
          }
          acc[date].leads += 1;
          acc[date].total_quality += lead.quality_score;
          return acc;
        }, {});

        setDailyLeads(
          Object.values(grouped).map((d: any) => ({
            date: d.date,
            leads: d.leads,
            avg_quality: Math.round(d.total_quality / d.leads)
          }))
        );
      }

      // Get customer metrics if customerId provided
      if (customerId) {
        const { data: metricsData } = await supabase
          .rpc('get_customer_metrics', { p_customer_id: customerId });
        
        setMetrics(metricsData);
      }

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.total_leads}</div>
              <p className="text-xs text-gray-500">{metrics.leads_this_month} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parseFloat(metrics.conversion_rate).toFixed(1)}%</div>
              <p className="text-xs text-gray-500">{metrics.converted_leads} converted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parseFloat(metrics.avg_quality_score).toFixed(0)}/100</div>
              <p className="text-xs text-gray-500">Lead quality score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cost Per Lead
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatIndianCurrency(metrics.avg_cost_per_lead)}
              </div>
              <p className="text-xs text-gray-500">Average CPL</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Quality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={qualityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {qualityDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Object.values(COLORS)[index % Object.values(COLORS).length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Leads Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Leads Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyLeads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Leads"
                />
                <Line 
                  type="monotone" 
                  dataKey="avg_quality" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Avg Quality"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Source Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourcePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="total_leads" 
                  fill="#3b82f6" 
                  name="Total Leads"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="avg_quality_score" 
                  fill="#10b981" 
                  name="Avg Quality"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


