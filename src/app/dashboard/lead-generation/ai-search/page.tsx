'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Briefcase,
  Clock,
  Star,
  Play,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AISearchPage() {
  const [searching, setSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({
    industry: '',
    location: '',
    keywords: '',
  });

  const [recentSearches] = useState([
    {
      id: 1,
      industry: 'Software Companies',
      location: 'Mumbai, Maharashtra',
      keywords: 'B2B SaaS, Enterprise Software',
      timestamp: '2 hours ago',
      leadsFound: 47,
      avgQualityScore: 85,
    },
    {
      id: 2,
      industry: 'E-commerce Businesses',
      location: 'Bangalore, Karnataka',
      keywords: 'Online Retail, D2C Brands',
      timestamp: '1 day ago',
      leadsFound: 63,
      avgQualityScore: 78,
    },
    {
      id: 3,
      industry: 'Marketing Agencies',
      location: 'Delhi NCR',
      keywords: 'Digital Marketing, SEO',
      timestamp: '3 days ago',
      leadsFound: 32,
      avgQualityScore: 82,
    },
  ]);

  const handleSearch = () => {
    if (!searchParams.industry || !searchParams.location) {
      toast.error('Please fill in industry and location');
      return;
    }

    setSearching(true);
    toast.loading('AI is searching for leads...');
    
    setTimeout(() => {
      setSearching(false);
      toast.dismiss();
      toast.success(`Found 47 potential leads! Check your Leads section.`);
      setSearchParams({ industry: '', location: '', keywords: '' });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Search className="h-8 w-8 text-purple-600" />
          AI Lead Search
        </h1>
        <p className="text-gray-600 mt-1">Search for potential customers using AI</p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>New Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Target Industry *</Label>
              <Input
                id="industry"
                placeholder="e.g., Software Companies, E-commerce, Healthcare"
                value={searchParams.industry}
                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Bangalore, Delhi NCR"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="keywords">Keywords (Optional)</Label>
            <Input
              id="keywords"
              placeholder="e.g., B2B, SaaS, Enterprise, SMB"
              value={searchParams.keywords}
              onChange={(e) => setSearchParams({ ...searchParams, keywords: e.target.value })}
            />
          </div>

          <Button 
            onClick={handleSearch}
            disabled={searching}
            className="bg-purple-600 hover:bg-purple-700 w-full"
            size="lg"
          >
            {searching ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start AI Search
              </>
            )}
          </Button>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-purple-900 mb-2">How AI Search Works:</p>
            <ul className="space-y-1 text-purple-700">
              <li>✓ AI searches Google Maps, LinkedIn, and business directories</li>
              <li>✓ Extracts company names, contacts, emails, and phone numbers</li>
              <li>✓ AI scores each lead for quality (0-100)</li>
              <li>✓ Results appear instantly in your Leads section</li>
              <li>✓ You can then send bulk outreach or contact individually</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
        <div className="space-y-3">
          {recentSearches.map((search) => (
            <Card key={search.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold">{search.industry}</span>
                      <Badge variant="outline">{search.leadsFound} leads</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {search.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {search.timestamp}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        Avg Score: {search.avgQualityScore}
                      </div>
                    </div>
                    {search.keywords && (
                      <div className="mt-2 text-xs text-gray-500">
                        Keywords: {search.keywords}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View Leads
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

