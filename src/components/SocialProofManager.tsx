'use client';

import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  company: string;
  industry: string;
  person: string;
  role: string;
  avatar: string;
  quote: string;
  results: {
    metric: string;
    value: string;
    period: string;
  };
  videoUrl?: string;
  featured: boolean;
}

interface SuccessStory {
  id: string;
  company: string;
  industry: string;
  logo: string;
  challenge: string;
  solution: string;
  results: {
    before: string;
    after: string;
    improvement: string;
  }[];
  timeline: string;
  caseStudyUrl: string;
}

export default function SocialProofManager() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVideoTestimonial, setShowVideoTestimonial] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      company: 'TechInnovate Solutions',
      industry: 'Technology & IT',
      person: 'Rajesh Kumar',
      role: 'Founder & CEO',
      avatar: '👨‍💼',
      quote: 'TransitionMarketing AI transformed our lead generation. We went from 20 leads/month to 150+ qualified leads with 60% less cost. ROI improved by 300% in just 3 months!',
      results: { metric: 'Lead Generation', value: '750%', period: 'increase in 3 months' },
      videoUrl: '/testimonials/rajesh-kumar.mp4',
      featured: true
    },
    {
      id: '2',
      company: 'DigitalGrowth Co.',
      industry: 'E-commerce',
      person: 'Priya Sharma',
      role: 'Marketing Director',
      avatar: '👩‍💼',
      quote: 'The AI automation for lead nurturing is incredible. Our conversion rate doubled and we reduced manual work by 80%. Our team can now focus on closing deals!',
      results: { metric: 'Conversion Rate', value: '100%', period: 'doubled in 30 days' },
      featured: true
    },
    {
      id: '3',
      company: 'HealthFirst Pharma',
      industry: 'Healthcare',
      person: 'Dr. Amit Singh',
      role: 'Business Development Head',
      avatar: '👨‍⚕️',
      quote: 'Healthcare lead generation was always challenging. This platform solved our targeting problems and increased qualified leads by 450% while reducing cost by 55%.',
      results: { metric: 'Cost Reduction', value: '55%', period: 'lower cost per lead' },
      featured: false
    },
    {
      id: '4',
      company: 'PropTech Real Estate',
      industry: 'Real Estate',
      person: 'Sunita Reddy',
      role: 'Sales Director',
      avatar: '👩‍💼',
      quote: 'Real estate deals require long nurturing cycles. The automation sequences are brilliant - they maintain relationships automatically while we close deals.',
      results: { metric: 'Deal Value', value: '₹2.5Cr', period: 'additional revenue' }
    }
  ];

  const successStories: SuccessStory[] = [
    {
      id: '1',
      company: 'CloudBridge Systems',
      industry: 'Technology & IT',
      logo: '☁️',
      challenge: 'Struggling with manual lead research, spending ₹1,50,000/month on multiple tools for 25 leads',
      solution: 'Implemented AI-powered LinkedIn scraping, automated outreach, and lead qualification',
      results: [
        { before: '25 leads/month', after: '180 leads/month', improvement: '620% increase' },
        { before: '₹6,000/lead', after: '₹1,200/lead', improvement: '80% cost reduction' },
        { before: '2 hours/day', after: '15 mins/day', improvement: '95% time savings' }
      ],
      timeline: 'Results seen in 45 days',
      caseStudyUrl: '/case-studies/cloudbridge-systems'
    },
    {
      id: '2',
      company: 'EduTech Innovations',
      industry: 'Education',
      logo: '🎓',
      challenge: 'Manual lead sourcing taking 60% of sales team time, low teacher engagement rates',
      solution: 'AI-powered teacher discovery, personalized outreach templates, educational content automation',
      results: [
        { before: '12 leads/month', after: '85 leads/month', improvement: '608% increase' },
        { before: '15% response rate', after: '38% response rate', improvement: '153% improvement' },
        { before: '₹15,000/deal', after: '₹4,500/deal', improvement: '70% cost reduction' }
      ],
      timeline: 'Breakthrough in 30 days',
      caseStudyUrl: '/case-studies/edutech-innovations'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonial.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonial.length]);

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const featuredStories = successStories.slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 Trusted by 500+ Indian Businesses</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          See how companies across industries are revolutionizing their lead generation with AI
        </p>
      </div>

      {/* Featured Video Testimonial */}
      {showVideoTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full relative">
            <button
              onClick={() => setShowVideoTestimonial(false)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-xl">
              <video controls className="w-full h-full rounded-xl">
                <source src="/testimonials/customer-story.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Main Testimonials Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">💬 What Our Customers Say</h3>
          <p className="text-gray-600">Real results from real businesses across India</p>
        </div>

        <div className="p-8">
          {/* Featured Testimonial Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white border-2 rounded-xl p-6 transition-all duration-300 ${
                  activeTestimonial === index 
                    ? 'border-blue-300 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.person}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                    <p className="text-xs text-gray-500">{testimonial.industry}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-bold text-lg">{testimonial.results.value}</span>
                    <span className="text-green-700 text-sm">{testimonial.results.metric}</span>
                  </div>
                  <p className="text-green-600 text-xs mt-1">{testimonial.results.period}</p>
                </div>

                {testimonial.videoUrl && (
                  <button
                    onClick={() => setShowVideoTestimonial(true)}
                    className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>🎥</span>
                    <span>Watch Video Testimonial</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Testimonial Picker */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonial.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Success Stories</h3>
          <p className="text-gray-600">Detailed case studies from our biggest wins</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {story.logo}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{story.company}</h4>
                  <p className="text-blue-600 font-medium">{story.industry}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">🎯 Challenge:</h5>
                  <p className="text-gray-600 text-sm">{story.challenge}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">💡 Solution:</h5>
                  <p className="text-gray-600 text-sm">{story.solution}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">📊 Results:</h5>
                  <div className="space-y-2">
                    {story.results.map((result, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">{result.before}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-medium text-sm">{result.after}</span>
                        </div>
                        <div className="text-xs text-blue-600 font-medium mt-1">{result.improvement}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{story.timeline}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read Full Case Study →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">🛡️ Why Businesses Trust Us</h3>
          <p className="text-gray-600">We're committed to your success with enterprise-grade security and support</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🔒', title: 'SOC 2 Certified', description: 'Enterprise Security' },
            { icon: '🛡️', title: 'GDPR Compliant', description: 'Data Protection' },
            { icon: '📞', title: '24/7 Support', description: 'Always Available' },
            { icon: '💰', title: 'ROI Guarantee', description: 'Money Back Promise' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-3">
                {item.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">🚀 Ready to Join Our Success Stories?</h3>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Start your free trial today and see results like these companies within 30 days
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
           <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
             🎯 Start Free Trial
           </button>
          <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            📞 Schedule Demo
          </button>
        </div>
      </div>
    </div>
        )}
      </div>
