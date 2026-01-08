'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Zap,
  CheckCircle,
  Clock,
  Globe,
  Link,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Activity,
  PieChart,
  LineChart,
  Download,
  RefreshCw
} from 'lucide-react';
import { generateInsights, analyzeAudience } from '@/lib/marketing-utils';

interface AnalyticsManagerProps {
  onInsightGenerated?: (insight: any) => void;
}

export default function AnalyticsManager({ onInsightGenerated }: AnalyticsManagerProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInsights, setGeneratedInsights] = useState<any>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [query, setQuery] = useState('');

  // Mock analytics data
  useEffect(() => {
    const mockInsights = [
      {
        id: '1',
        title: 'Email Open Rates Above Industry Average',
        description: 'Your email open rates are 15% above industry average',
        type: 'positive',
        impact: 'high',
        recommendation: 'Continue current email strategy',
        metrics: { openRate: 89.2, industryAvg: 74.2 }
      },
      {
        id: '2',
        title: 'Mobile Traffic Optimization Needed',
        description: 'Mobile traffic accounts for 68% of total visits but has lower conversion',
        type: 'warning',
        impact: 'medium',
        recommendation: 'Optimize mobile experience and landing pages',
        metrics: { mobileTraffic: 68, conversion: 2.1 }
      },
      {
        id: '3',
        title: 'Content Performance Peak on Tuesdays',
        description: 'Content published on Tuesdays performs 23% better',
        type: 'insight',
        impact: 'medium',
        recommendation: 'Schedule more content for Tuesday publishing',
        metrics: { tuesdayPerformance: 23, avgPerformance: 100 }
      }
    ];
    setInsights(mockInsights);
  }, []);

  const handleGenerateInsights = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    try {
      const results = await generateInsights(query);
      setGeneratedInsights(results);
      onInsightGenerated?.(results);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'insight': return 'bg-blue-100 text-blue-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'insight': return <BarChart3 className="h-4 w-4" />;
      case 'negative': return <TrendingDown className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI Analytics Insights
          </CardTitle>
          <CardDescription>
            Get AI-powered insights and recommendations for your marketing performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Analysis Query</label>
              <Input 
                placeholder="e.g., why is my conversion rate low, analyze email performance"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              User Journey
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Attribution
            </Button>
          </div>
          
          <Button 
            onClick={handleGenerateInsights} 
            disabled={isGenerating || !query.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating Insights...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Insights
              </>
            )}
          </Button>
          
          {generatedInsights && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Key Insights</h4>
                <div className="space-y-2">
                  {generatedInsights.insights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {generatedInsights.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Performance Trends</h4>
                <div className="grid grid-cols-2 gap-4">
                  {generatedInsights.trends.map((trend: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium">{trend.metric}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{trend.change}%</span>
                        {trend.trend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500" />
                        ) : trend.trend === 'down' ? (
                          <ArrowDownRight className="h-3 w-3 text-red-500" />
                        ) : (
                          <Minus className="h-3 w-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Predictions</h4>
                <div className="grid grid-cols-2 gap-4">
                  {generatedInsights.predictions.map((pred: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium">{pred.metric}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Current: {formatNumber(pred.current)}</span>
                        <span className="text-sm font-medium text-green-600">Predicted: {formatNumber(pred.predicted)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Confidence: {pred.confidence}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Apply Recommendations
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,200</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +23.5% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Website Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.3% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +0.8% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cost per Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.50</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -8.9% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>Performance across all marketing channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Website</div>
                  <div className="text-sm text-muted-foreground">Organic & Direct Traffic</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">45.2K visitors</div>
                <div className="text-sm text-green-600">+12.3%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Paid Ads</div>
                  <div className="text-sm text-muted-foreground">Google, Facebook, LinkedIn</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">18.7K visitors</div>
                <div className="text-sm text-green-600">+8.9%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Email Marketing</div>
                  <div className="text-sm text-muted-foreground">Newsletters & Campaigns</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">15.4K subscribers</div>
                <div className="text-sm text-green-600">+5.1%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Search className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium">SEO</div>
                  <div className="text-sm text-muted-foreground">Organic Search</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">28.9K visitors</div>
                <div className="text-sm text-green-600">+15.7%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Automated insights and recommendations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getInsightIcon(insight.type)}
                      <h3 className="font-semibold">{insight.title}</h3>
                      <Badge className={getInsightColor(insight.type)}>
                        {insight.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Impact: </span>
                        <span className="font-medium">{insight.impact}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recommendation: </span>
                        <span className="font-medium">{insight.recommendation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Performance</CardTitle>
            <CardDescription>Live metrics and monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Users</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Page Views (24h)</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">8,934</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Conversions (24h)</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">47</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue (24h)</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">$2,340</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Alerts</CardTitle>
            <CardDescription>Automated alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Budget Alert</div>
                  <div className="text-xs text-muted-foreground">Google Ads budget 80% used</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Performance Boost</div>
                  <div className="text-xs text-muted-foreground">Email open rates up 15%</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">New Opportunity</div>
                  <div className="text-xs text-muted-foreground">High-performing keyword identified</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
