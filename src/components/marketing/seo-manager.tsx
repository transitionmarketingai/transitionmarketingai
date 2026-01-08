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
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  Clock,
  Globe,
  Link,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { analyzeSEO } from '@/lib/marketing-utils';
import { Keyword } from '@/lib/marketing-data';

interface SEOManagerProps {
  onKeywordAnalyzed?: (keyword: Keyword) => void;
}

export default function SEOManager({ onKeywordAnalyzed }: SEOManagerProps) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrend, setFilterTrend] = useState<string>('all');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');

  // Mock keywords data
  useEffect(() => {
    const mockKeywords: Keyword[] = [
      {
        keyword: 'AI marketing automation',
        volume: 12000,
        difficulty: 65,
        cpc: 2.50,
        position: 3,
        trend: 'up'
      },
      {
        keyword: 'digital marketing tools',
        volume: 8500,
        difficulty: 58,
        cpc: 1.80,
        position: 7,
        trend: 'stable'
      },
      {
        keyword: 'marketing automation software',
        volume: 6200,
        difficulty: 72,
        cpc: 3.20,
        position: 5,
        trend: 'up'
      },
      {
        keyword: 'email marketing platform',
        volume: 4800,
        difficulty: 45,
        cpc: 1.50,
        position: 12,
        trend: 'down'
      },
      {
        keyword: 'social media management',
        volume: 15000,
        difficulty: 78,
        cpc: 2.80,
        position: 8,
        trend: 'stable'
      }
    ];
    setKeywords(mockKeywords);
  }, []);

  const handleAnalyzeKeyword = async (keyword: string) => {
    setIsAnalyzing(true);
    try {
      const results = await analyzeSEO(keyword);
      setAnalysisResults(results);
      setSelectedKeyword(keyword);
      
      // Update keyword in list
      const updatedKeywords = keywords.map(k => 
        k.keyword === keyword 
          ? { ...k, volume: results.volume, difficulty: results.difficulty, cpc: results.cpc }
          : k
      );
      setKeywords(updatedKeywords);
      
      onKeywordAnalyzed?.(updatedKeywords.find(k => k.keyword === keyword)!);
    } catch (error) {
      console.error('Error analyzing keyword:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrend = filterTrend === 'all' || keyword.trend === filterTrend;
    return matchesSearch && matchesTrend;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return 'text-red-600';
    if (difficulty >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Keyword Research */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Keyword Research & Analysis
          </CardTitle>
          <CardDescription>
            Discover and analyze keywords for your SEO strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Keyword to Analyze</label>
              <Input 
                placeholder="e.g., AI marketing automation, digital marketing tools"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAnalyzeKeyword(e.currentTarget.value);
                  }
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target Location</label>
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Competitor Analysis
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Content Ideas
            </Button>
          </div>
          
          <Button 
            onClick={() => handleAnalyzeKeyword('AI marketing automation')}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Keyword...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Analyze Keyword
              </>
            )}
          </Button>
          
          {analysisResults && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Search Volume</div>
                  <div className="text-lg font-bold text-blue-600">{formatNumber(analysisResults.volume)}</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                  <div className="text-lg font-bold text-orange-600">{analysisResults.difficulty}%</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">CPC</div>
                  <div className="text-lg font-bold text-green-600">${analysisResults.cpc}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Competition</div>
                  <div className="text-lg font-bold text-purple-600">{analysisResults.competition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3">Keyword Suggestions</h4>
                  <div className="space-y-2">
                    {analysisResults.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Content Opportunities</h4>
                  <div className="space-y-2">
                    {analysisResults.opportunities.map((opportunity: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Add to Keyword List
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Content
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Track Rankings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Keyword Tracking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Keyword Tracking</CardTitle>
              <CardDescription>Monitor your keyword rankings and performance</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Keyword
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTrend} onValueChange={setFilterTrend}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                <SelectItem value="up">Trending Up</SelectItem>
                <SelectItem value="down">Trending Down</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Keywords List */}
          <div className="space-y-4">
            {filteredKeywords.map((keyword) => (
              <div key={keyword.keyword} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="h-4 w-4" />
                      <h3 className="font-semibold">{keyword.keyword}</h3>
                      <Badge variant="secondary">
                        Position: {keyword.position || 'N/A'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Search Volume</div>
                        <div className="font-medium">{formatNumber(keyword.volume)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Difficulty</div>
                        <div className={`font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                          {keyword.difficulty}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">CPC</div>
                        <div className="font-medium">${keyword.cpc}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Trend</div>
                        <div className={`flex items-center gap-1 font-medium ${getTrendColor(keyword.trend)}`}>
                          {getTrendIcon(keyword.trend)}
                          {keyword.trend}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Google Search
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {keyword.difficulty >= 70 ? 'High Competition' : keyword.difficulty >= 40 ? 'Medium Competition' : 'Low Competition'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAnalyzeKeyword(keyword.keyword)}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <Clock className="h-4 w-4 animate-spin" />
                      ) : (
                        <Zap className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ranking Performance</CardTitle>
            <CardDescription>Track your keyword ranking improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 10 Rankings</span>
                <span className="text-sm font-medium text-green-600">+8 this month</span>
              </div>
              <Progress value={65} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 50 Rankings</span>
                <span className="text-sm font-medium text-green-600">+15 this month</span>
              </div>
              <Progress value={78} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Keywords Tracked</span>
                <span className="text-sm font-medium">{keywords.length}</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Optimization</CardTitle>
            <CardDescription>AI-powered content optimization suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Meta Descriptions</div>
                  <div className="text-xs text-muted-foreground">5 pages need optimization</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Title Tags</div>
                  <div className="text-xs text-muted-foreground">All optimized</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Internal Links</div>
                  <div className="text-xs text-muted-foreground">12 pages need more links</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Page Speed</div>
                  <div className="text-xs text-muted-foreground">All pages optimized</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywords.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(keywords.reduce((acc, k) => acc + (k.position || 0), 0) / keywords.length)}
            </div>
            <p className="text-xs text-muted-foreground">+3 positions this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Organic Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+5 points this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
