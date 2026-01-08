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
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  Zap,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { generateContent } from '@/lib/marketing-utils';
import { Content } from '@/lib/marketing-data';

interface ContentManagerProps {
  onContentGenerated?: (content: Content) => void;
}

export default function ContentManager({ onContentGenerated }: ContentManagerProps) {
  const [content, setContent] = useState<Content[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedType, setSelectedType] = useState<'blog' | 'social' | 'email' | 'ad'>('blog');
  const [prompt, setPrompt] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock content data
  useEffect(() => {
    const mockContent: Content[] = [
      {
        id: '1',
        title: '5 Ways AI is Revolutionizing Digital Marketing',
        type: 'blog',
        status: 'published',
        content: 'Artificial Intelligence is transforming how businesses approach digital marketing...',
        seoScore: 92,
        engagement: 89.2,
        publishDate: '2024-12-15',
        tags: ['AI', 'marketing', 'automation'],
        platform: 'website'
      },
      {
        id: '2',
        title: 'Holiday Sale - 50% Off All Plans',
        type: 'email',
        status: 'published',
        content: 'Don\'t miss our biggest sale of the year...',
        engagement: 78.5,
        publishDate: '2024-12-20',
        tags: ['sale', 'holiday', 'promotion'],
        platform: 'email'
      },
      {
        id: '3',
        title: 'New Feature Release: Advanced Analytics',
        type: 'social',
        status: 'scheduled',
        content: 'Excited to announce our new advanced analytics dashboard...',
        engagement: 0,
        publishDate: '2024-12-25',
        tags: ['feature', 'analytics', 'announcement'],
        platform: 'twitter'
      }
    ];
    setContent(mockContent);
  }, []);

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const generated = await generateContent(prompt, selectedType);
      setGeneratedContent(generated);
      
      // Create new content item
      const newContent: Content = {
        id: Date.now().toString(),
        title: prompt,
        type: selectedType,
        status: 'draft',
        content: generated,
        tags: [selectedType, 'AI-generated'],
        platform: selectedType === 'blog' ? 'website' : selectedType === 'social' ? 'twitter' : 'email'
      };
      
      setContent(prev => [newContent, ...prev]);
      onContentGenerated?.(newContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'email': return <Target className="h-4 w-4" />;
      case 'ad': return <TrendingUp className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate high-quality content for any marketing channel using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="ad">Advertisement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target Audience</label>
              <Select defaultValue="general">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Audience</SelectItem>
                  <SelectItem value="tech">Tech Professionals</SelectItem>
                  <SelectItem value="business">Business Owners</SelectItem>
                  <SelectItem value="marketers">Marketing Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Content Prompt</label>
            <Input
              placeholder="e.g., Write a blog post about AI in marketing, professional tone"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Add Keywords
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Set Audience
            </Button>
          </div>
          
          <Button 
            onClick={handleGenerateContent} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Content
              </>
            )}
          </Button>
          
          {generatedContent && (
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Generated Content</label>
              <Textarea
                value={generatedContent}
                readOnly
                rows={12}
                className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-primary/20"
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Content
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Library */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Manage all your marketing content</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Content
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
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(item.type)}
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.publishDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        {item.engagement}% engagement
                      </div>
                      {item.seoScore && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          SEO: {item.seoScore}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
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

      {/* Content Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(content.reduce((acc, item) => acc + (item.engagement || 0), 0) / content.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(content.reduce((acc, item) => acc + (item.seoScore || 0), 0) / content.length)}
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
