'use client';

import React, { useState } from 'react';

interface ContentCampaign {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'social' | 'blog';
  status: 'draft' | 'active' | 'scheduled' | 'completed';
  targetAudience: string;
  createdAt: string;
  performance?: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
}

interface ContentCreatorProps {
  onContentCreate?: (content: any) => void;
}

export default function AIContentCreator({ onContentCreate }: ContentCreatorProps) {
  const [activeTab, setActiveTab] = useState<'generator' | 'campaigns' | 'templates'>('generator');
  const [contentType, setContentType] = useState<'email' | 'linkedin' | 'social' | 'blog'>('email');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  const [contentBrief, setContentBrief] = useState({
    purpose: '',
    targetAudience: '',
    keyPoints: '',
    tone: 'professional',
    length: 'medium',
    callToAction: ''
  });

  const sampleCampaigns: ContentCampaign[] = [
    {
      id: '1',
      name: 'Q1 SaaS Onboarding Series',
      type: 'email',
      status: 'active',
      targetAudience: 'New SaaS Customers',
      createdAt: '2024-01-15',
      performance: { sent: 247, opened: 189, clicked: 56, replied: 23 }
    },
    {
      id: '2',
      name: 'LinkedIn Thought Leadership',
      type: 'linkedin',
      status: 'scheduled',
      targetAudience: 'Industry Professionals',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Product Announcement Campaign',
      type: 'social',
      status: 'completed',
      targetAudience: 'Existing Customers',
      createdAt: '2024-01-10',
      performance: { sent: 1205, opened: 892, clicked: 234, replied: 89 }
    }
  ];

  const contentTemplates = {
    email: [
      { name: 'Welcome Series', icon: '📧', description: 'Onboarding emails for new customers' },
      { name: 'Follow-up Series', icon: '🔄', description: 'Automated follow-up sequences' },
      { name: 'Product Announcement', icon: '📢', description: 'Launch new features or products' },
      { name: 'Customer Success Story', icon: '🌟', description: 'Share customer achievements' },
      { name: 'Educational Series', icon: '🎓', description: 'How-to guides and tutorials' }
    ],
    linkedin: [
      { name: 'Thought Leadership', icon: '💡', description: 'Industry insights and expertise' },
      { name: 'Behind the Scenes', icon: '🎬', description: 'Company culture and process' },
      { name: 'Case Study', icon: '📊', description: 'Customer success stories' },
      { name: 'Industry Trends', icon: '📈', description: 'Market analysis and predictions' },
      { name: 'Company Updates', icon: '🏢', description: 'News and announcements' }
    ],
    social: [
      { name: 'Engagement Post', icon: '❤️', description: 'Community interaction posts' },
      { name: 'Behind the Scenes', icon: '📸', description: 'Company culture insights' },
      { name: 'Product Showcase', icon: '💎', description: 'Highlights products/services' },
      { name: 'Trending Topics', icon: '🔥', description: 'Industry news and discussions' },
      { name: 'User Generated Content', icon: '👥', description: 'Customer stories and testimonials' }
    ],
    blog: [
      { name: 'How-to Guide', icon: '📖', description: 'Step-by-step tutorials' },
      { name: 'Industry Analysis', icon: '📊', description: 'Market trends and insights' },
      { name: 'Case Study', icon: '🔍', description: 'Detailed customer stories' },
      { name: 'Best Practices', icon: '✅', description: 'Industry tips and recommendations' },
      { name: 'Analysis Report', icon: '📈', description: 'Data-driven insights' }
    ]
  };

  const handleGenerateContent = async () => {
    if (!contentBrief.purpose || !contentBrief.targetAudience) {
      alert('Please fill in the purpose and target audience');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const templates = {
        email: `Subject: ${contentBrief.purpose} - Quick Action Required

Hi there,

I hope this message finds you well. Based on your ${contentBrief.targetAudience} profile, I wanted to reach out about ${contentBrief.purpose}.

Here's what I wanted to share:

${contentBrief.keyPoints.split(',').map(point => `• ${point.trim()}`).join('\n')}

This opportunity could help ${contentBrief.targetAudience.toLowerCase()} achieve better results and streamline their processes.

${contentBrief.tone === 'professional' ? 'I would love to schedule a brief call where we could discuss this further and see if it aligns with your current objectives.' : 'Would you be interested in learning more about this?'}

${contentBrief.callToAction ? `Next steps: ${contentBrief.callToAction}` : 'I look forward to hearing from you soon.'}

Best regards,
[Your Name]

P.S. I've helped similar ${contentBrief.targetAudience.toLowerCase()} achieve remarkable results. Happy to share some case studies if you're interested.`,

        linkedin: `${contentBrief.purpose.charAt(0).toUpperCase() + contentBrief.purpose.slice(1)} for ${contentBrief.targetAudience}: A Game Changer?

${contentBrief.targetAudience} professionals are constantly looking for ways to improve efficiency and drive better results.

Here are the key insights I've discovered:

${contentBrief.keyPoints.split(',').map(point => `🔹 ${point.trim()}`).join('\n')}

Based on my experience working with ${contentBrief.targetAudience.toLowerCase()}, these strategies can make a significant difference.

What's been your experience with ${contentBrief.purpose.toLowerCase()}? I'd love to hear your thoughts in the comments below.

${contentBrief.callToAction ? `For those interested in exploring this further: ${contentBrief.callToAction}` : '#productivity #marketing #business'}`,

        social: `🚀 ${contentBrief.purpose}! 

${contentBrief.targetAudience} - this is for YOU! 

Here's what caught my attention:

${contentBrief.keyPoints.split(',').map(point => `✨ ${point.trim()}`).join('\n')}

Thoughts? 👇

${contentBrief.callToAction ? `👉 ${contentBrief.callToAction}` : `#business #growth #marketing`}

        What do you think about this approach?`,

        blog: `# ${contentBrief.purpose}: A Complete Guide for ${contentBrief.targetAudience}

In today's fast-paced digital landscape, ${contentBrief.targetAudience.toLowerCase()} face unique challenges that require innovative solutions.

## Understanding the Challenge

${contentBrief.purpose} has become increasingly important for ${contentBrief.targetAudience.toLowerCase()} seeking to stay competitive in their markets.

## Key Strategies

Here are the essential approaches that have proven successful:

${contentBrief.keyPoints.split(',').map(point => `
### ${point.trim()}

This strategy focuses on...`).join('\n')}

## Implementation Tips

When implementing ${contentBrief.purpose.toLowerCase()}, consider these important factors:

- Start with clear objectives
- Focus on measurable outcomes  
- Adapt based on feedback
- Continuously optimize your approach

## Conclusion

${contentBrief.purpose} offers ${contentBrief.targetAudience.toLowerCase()} tremendous opportunities for growth when implemented correctly.

${contentBrief.callToAction ? `Ready to get started? ${contentBrief.callToAction}` : 'What strategies have worked best for you in this area?'}

---

*About the author: [Brief description of expertise and experience with ${contentBrief.targetAudience.toLowerCase()}]`
      };

      setGeneratedContent(templates[contentType]);
      setIsGenerating(false);
    }, 4000);
  };

  const handleSaveContent = () => {
    if (onContentCreate) {
      onContentCreate({
        type: contentType,
        content: generatedContent,
        brief: contentBrief,
        createdAt: new Date().toISOString()
      });
    }
    alert('Content saved successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      case 'draft': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderContentGenerator = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Content Generator</h2>
        <p className="text-gray-600 mb-6">
          Create personalized, high-converting content using AI. Specify your requirements and watch AI generate engaging copy tailored to your audience.
        </p>
      </div>

      {/* Content Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(contentTemplates).map(([type, templates]) => (
            <button
              key={type}
              onClick={() => setContentType(type as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                contentType === type 
                  ? 'border-blue-500 bg-blue-50 text-blue-900' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{templates[0].icon}</div>
                <div className="text-sm font-medium capitalize">{type}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Brief Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Purpose *
          </label>
          <input 
            type="text"
            placeholder="e.g., Promote new product feature"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.purpose}
            onChange={(e) => setContentBrief({...contentBrief, purpose: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience *
          </label>
          <input 
            type="text"
            placeholder="e.g., Small Business Owners"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.targetAudience}
            onChange={(e) => setContentBrief({...contentBrief, targetAudience: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Points
          </label>
          <input 
            type="text"
            placeholder="e.g., Cost reduction, Easy setup, Industry-leading security"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.keyPoints}
            onChange={(e) => setContentBrief({...contentBrief, keyPoints: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.tone}
            onChange={(e) => setContentBrief({...contentBrief, tone: e.target.value})}
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
            <option value="authoritative">Authoritative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Length
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.length}
            onChange={(e) => setContentBrief({...contentBrief, length: e.target.value})}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call to Action
          </label>
          <input 
            type="text"
            placeholder="e.g., Schedule a demo, Download free trial"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={contentBrief.callToAction}
            onChange={(e) => setContentBrief({...contentBrief, callToAction: e.target.value})}
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button 
          onClick={handleGenerateContent}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              AI is crafting your content...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate AI Content
            </span>
          )}
        </button>

        {isGenerating && (
          <div className="mt-4 text-sm text-gray-600">
            <p>🤖 Analyzing your requirements and audience...</p>
            <p>✨ Crafting personalized messaging...</p>
            <p>🎯 Optimizing for engagement and conversions...</p>
          </div>
        )}
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Copy
              </button>
              <button 
                onClick={handleSaveContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Save Content
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 whitespace-pre-wrap text-gray-900 leading-relaxed">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Content Campaigns</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create New Campaign
        </button>
      </div>

      <div className="space-y-4">
        {sampleCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Target: {campaign.targetAudience}</p>
                <p className="text-sm text-gray-500">Created: {new Date(campaign.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-semibold mb-1 ${
                  campaign.type === 'email' ? 'text-blue-600' :
                  campaign.type === 'linkedin' ? 'text-blue-700' :
                  campaign.type === 'social' ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(.1)}
                </div>
              </div>
            </div>

            {campaign.performance && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{campaign.performance.sent}</div>
                  <div className="text-sm text-gray-600">Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{campaign.performance.opened}</div>
                  <div className="text-sm text-gray-600">Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{campaign.performance.clicked}</div>
                  <div className="text-sm text-gray-600">Clicked</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">{campaign.performance.replied}</div>
                  <div className="text-sm text-gray-600">Replied</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Templates</h2>
        <p className="text-gray-600 mb-6">
          Choose from our pre-built templates for different content types and marketing scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentTemplates[contentType].map((template, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{template.icon}</span>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            AI Content Creation
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Engaging Content at Scale</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate personalized, high-converting marketing content using AI. 
            From emails to social posts, create engaging content that resonates with your audience.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {[
              { id: 'generator', label: 'AI Generator', icon: '🤖' },
              { id: 'campaigns', label: 'Campaigns', icon: '📢' },
              { id: 'templates', label: 'Templates', icon: '📄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'generator' && renderContentGenerator()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'templates' && renderTemplates()}
        </div>
      </div>
    </div>
  );
}
