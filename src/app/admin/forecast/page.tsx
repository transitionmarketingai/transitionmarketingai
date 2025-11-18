'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, TrendingDown, Download, RefreshCw, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ForecastData {
  forecast: {
    nextMonth: {
      leads: number;
      conversionRate: number;
      mrr: number;
      churnRate: number;
    };
    next3Months: {
      leads: number[];
      revenue: number[];
      conversionRates: number[];
    };
    growthRate: number;
    churnProbability: {
      byIndustry: Record<string, number>;
    };
  };
  insights: string[];
  recommendations: Array<{
    action: string;
    impact: string;
    priority: string;
  }>;
  adBudgetAdjustment: {
    percentage: number;
    reason: string;
  };
}

export default function AdminForecastPage() {
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [currentMetrics, setCurrentMetrics] = useState({
    leads: 0,
    conversionRate: 0,
    mrr: 0,
    churnRate: 0,
  });

  // Fetch historical data and generate forecast
  const generateForecast = async () => {
    setLoading(true);
    try {
      // First, fetch historical data
      const dataResponse = await fetch('/api/forecast/data?months=12');
      const dataResult = await dataResponse.json();

      if (!dataResult.success) {
        toast.error('Failed to fetch historical data');
        return;
      }

      setHistoricalData(dataResult.data.data);

      // Calculate current metrics from last month
      const lastMonth = dataResult.data.data.leads[dataResult.data.data.leads.length - 1];
      if (lastMonth) {
        setCurrentMetrics({
          leads: lastMonth.count,
          conversionRate: lastMonth.conversionRate,
          mrr: dataResult.data.data.revenue[dataResult.data.data.revenue.length - 1]?.mrr || 0,
          churnRate: dataResult.data.data.clients[dataResult.data.data.clients.length - 1]?.churnRate || 0,
        });
      }

      // Generate AI forecast
      const forecastResponse = await fetch('/api/ai-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataResult.data.data }),
      });

      const forecastResult = await forecastResponse.json();

      if (forecastResult.success) {
        setForecastData(forecastResult.data.forecast);
        trackEvent('forecast_viewed_admin', {
          event_category: 'forecast',
          event_label: 'forecast_viewed',
        });
        toast.success('Forecast generated successfully');
      } else {
        toast.error('Failed to generate forecast');
      }
    } catch (error) {
      console.error('Error generating forecast:', error);
      toast.error('Error generating forecast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateForecast();
  }, []);

  const calculateDelta = (forecast: number, current: number) => {
    if (current === 0) return 0;
    return ((forecast - current) / current) * 100;
  };

  const getTrendIcon = (delta: number) => {
    if (delta > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (delta < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getTrendColor = (delta: number) => {
    if (delta > 0) return 'text-green-600';
    if (delta < 0) return 'text-red-600';
    return 'text-slate-600';
  };

  // Prepare chart data
  const chartData = historicalData?.leads?.map((lead: any, index: number) => ({
    month: lead.month,
    actual: lead.count,
    forecast: forecastData?.forecast.next3Months.leads[index] || null,
    revenue: historicalData.revenue[index]?.mrr || 0,
    forecastRevenue: forecastData?.forecast.next3Months.revenue[index] || null,
  })) || [];

  // Industry growth data
  const industryData = forecastData?.forecast.churnProbability.byIndustry
    ? Object.entries(forecastData.forecast.churnProbability.byIndustry).map(([industry, churn]) => ({
        industry,
        churnProbability: churn,
        growthPotential: 100 - (churn as number),
      }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                AI Growth Forecast
              </h1>
              <p className="text-slate-600">Predictive analytics and actionable growth targets</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={generateForecast}
                disabled={loading}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Forecast
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Forecast Overview Cards */}
        {forecastData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      {forecastData.forecast.nextMonth.leads.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getTrendIcon(calculateDelta(forecastData.forecast.nextMonth.leads, currentMetrics.leads))}
                      <span className={`text-sm font-medium ${getTrendColor(calculateDelta(forecastData.forecast.nextMonth.leads, currentMetrics.leads))}`}>
                        {calculateDelta(forecastData.forecast.nextMonth.leads, currentMetrics.leads).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      {forecastData.forecast.nextMonth.conversionRate.toFixed(1)}%
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getTrendIcon(calculateDelta(forecastData.forecast.nextMonth.conversionRate, currentMetrics.conversionRate))}
                      <span className={`text-sm font-medium ${getTrendColor(calculateDelta(forecastData.forecast.nextMonth.conversionRate, currentMetrics.conversionRate))}`}>
                        +{Math.abs(calculateDelta(forecastData.forecast.nextMonth.conversionRate, currentMetrics.conversionRate)).toFixed(1)} pts
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✅</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">MRR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      ₹{(forecastData.forecast.nextMonth.mrr / 100000).toFixed(1)}L
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getTrendIcon(calculateDelta(forecastData.forecast.nextMonth.mrr, currentMetrics.mrr))}
                      <span className={`text-sm font-medium ${getTrendColor(calculateDelta(forecastData.forecast.nextMonth.mrr, currentMetrics.mrr))}`}>
                        {calculateDelta(forecastData.forecast.nextMonth.mrr, currentMetrics.mrr).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-600 text-xs">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      {forecastData.forecast.nextMonth.churnRate.toFixed(1)}%
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getTrendIcon(-calculateDelta(forecastData.forecast.nextMonth.churnRate, currentMetrics.churnRate))}
                      <span className={`text-sm font-medium ${getTrendColor(-calculateDelta(forecastData.forecast.nextMonth.churnRate, currentMetrics.churnRate))}`}>
                        {calculateDelta(forecastData.forecast.nextMonth.churnRate, currentMetrics.churnRate).toFixed(1)} pt
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">🟢</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts */}
        {forecastData && historicalData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Leads & Revenue Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>Leads & Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="actual"
                      stroke="#3b82f6"
                      name="Actual Leads"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="forecast"
                      stroke="#8b5cf6"
                      name="Forecast Leads"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      name="Actual Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="forecastRevenue"
                      stroke="#f59e0b"
                      name="Forecast Revenue"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Industry Growth Projection */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="industry" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="growthPotential" fill="#3b82f6" name="Growth Potential %" />
                    <Bar dataKey="churnProbability" fill="#ef4444" name="Churn Risk %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Recommendations */}
        {forecastData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Insights */}
              <div>
                <h3 className="font-semibold mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  {forecastData.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-slate-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3">Recommended Actions</h3>
                <div className="space-y-3">
                  {forecastData.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-lg bg-slate-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{rec.action}</h4>
                        <Badge
                          className={
                            rec.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : rec.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{rec.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Budget Adjustment */}
              {forecastData.adBudgetAdjustment && (
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Ad Budget Recommendation</h3>
                  <p className="text-blue-800 mb-2">
                    <strong>Adjustment:</strong> {forecastData.adBudgetAdjustment.percentage > 0 ? '+' : ''}
                    {forecastData.adBudgetAdjustment.percentage}%
                  </p>
                  <p className="text-sm text-blue-700">{forecastData.adBudgetAdjustment.reason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {loading && !forecastData && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-slate-600">Generating AI forecast...</p>
          </div>
        )}
      </div>
    </div>
  );
}


