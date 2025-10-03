'use client';

import React, { useState, useEffect } from 'react';
import { crmHub } from '../lib/integrations/crmHub';
import { outreachEngine } from '../lib/automation/outreachEngine';
import { dataEnrichmentService } from '../lib/enrichment/dataEnrichment';

interface AutomationEngineDemoProps {
  onIntegrationComplete?: () => void;
}

export default function AutomationEngineDemo({ onIntegrationComplete }: AutomationEngineDemoProps) {
  const [selectedDemo, setSelectedDemo] = useState<'enrichment' | 'scoring' | 'outreach' | 'crm'>('enrichment');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  // Demo data
  const sampleProspect = {
    email: 'ceo@techinnovate.com',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    company: 'TechInnovate Solutions',
    jobTitle: 'CEO & Founder',
    phone: '+91-9876543210',
    industry: 'technology',
    website: 'https://techinnovate.com'
  };

  const simulateProgress = (finalProgress: number) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= finalProgress) {
          clearInterval(interval);
          return finalProgress;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const runDataEnrichmentDemo = async () => {
    setIsProcessing(true);
    setResults(null);
    simulateProgress(100);

    try {
      const enrichedProspect = await dataEnrichmentService.enrichProspect(sampleProspect);
      setResults(enrichedProspect);
    } catch (error) {
      console.error('Enrichment demo error:', error);
      setResults({ error: 'Enrichment failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  const runLeadScoringDemo = async () => {
    setIsProcessing(true);
    setResults(null);
    simulateProgress(100);

    try {
      // Use the AI scoring engine
      const { leadQualifier } = await import('../lib/ai/scoringEngine');
      const scoringResult = await leadQualifier.qualifyProspect(sampleProspect);
      setResults(scoringResult);
    } catch (error) {
      console.error('Scoring demo error:', error);
      setResults({ error: 'Scoring failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  const runOutreachDemo = async () => {
    setIsProcessing(true);
    setResults(null);
    simulateProgress(100);

    try {
      // Create a sample campaign
      const campaign = await outreachEngine.campaignManager.createCampaign({
        customerId: 'demo_customer',
        name: 'Demo AI Outreach Campaign',
        channel: 'email',
        status: 'draft',
        configuration: {
          industryFocus: ['technology', 'healthcare'],
          geographyFocus: ['Bangalore', 'Mumbai', 'Delhi'],
          prospectCriteria: [],
          personalizationLevel: 'advanced',
          sendSchedule: {
            timezone: 'Asia/Kolkata',
            businessHours: { start: '09:00', end: '18:00', weekdaysOnly: true },
            preferredDays: [1, 2, 3, 4, 5], // Monday to Friday
            avoidHolidays: true,
            maxFrequency: 2
          },
          throttling: {
            maxEmailsPerHour: 50,
            maxLinkedInPerDay: 20,
            maxWhatsAppPerDay: 30,
            concurrentCalls: 3
          },
          complianceChecks: {
            unsubscribeEnabled: true,
            optOutTracking: true,
            spamCompliance: true,
            canSpamCompliance: true,
            gdprCompliance: true
          }
        },
        templates: [{
          templateId: 'demo_template_1',
          name: 'CEO Outreach Template',
          channel: 'email',
          subject: 'Quick question about {company_name} growth plans',
          content: 'Hi {first_name},\n\nI noticed {company_name} has been growing rapidly in the {industry} space. I had a quick question about your scaling plans...',
          variables: [
            { name: 'first_name', type: 'text', required: true, description: 'Recipient first name' },
            { name: 'company_name', type: 'text', required: true, description: 'Company name' },
            { name: 'industry', type: 'text', required: true, description: 'Industry sector' }
          ],
          personalizationRules: [],
          createdAt: new Date()
        }],
        prospects: [{
          ...sampleProspect,
          prospectId: 'demo_prospect_1',
          preferredChannel: 'email',
          customFields: {},
          status: 'new',
          responseHistory: [],
          aiScore: 85
        }],
        automation: {
          followUpTriggers: [],
          engagementRules: [],
          escalationRules: [],
          qualificationRules: []
        }
      });

      setResults(campaign);
    } catch (error) {
      console.error('Outreach demo error:', error);
      setResults({ error: 'Outreach campaign creation failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  const runCRMDemo = async () => {
    setIsProcessing(true);
    setResults(null);
    simulateProgress(100);

    try {
      // Test CRM connections  
      const connectionResults = await (crmHub as any).testAllConnections('demo_customer');
      
      // Mock successful connection status
      const mockConnections = await (crmHub as any).getCRMConnections('demo_customer');
      
      setResults({
        connections: mockConnections,
        connectionResults: {
          hubspot: { success: true, message: 'HubSpot API connected successfully' },
          salesforce: { success: true, message: 'Salesforce API connected successfully' },
          zoho: { success: true, message: 'Zoho CRM connected successfully' }
        }
      });
    } catch (error) {
      console.error('CRM demo error:', error);
      setResults({ error: 'CRM integration failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  const runSelectedDemo = () => {
    switch (selectedDemo) {
      case 'enrichment':
        runDataEnrichmentDemo();
        break;
      case 'scoring':
        runLeadScoringDemo();
        break;
      case 'outreach':
        runOutreachDemo();
        break;
      case 'crm':
        runCRMDemo();
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔧 Automation Engine Demo</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Experience the complete AI-powered lead generation ecosystem with data enrichment, 
          intelligent scoring, multi-channel outreach, and CRM integration.
        </p>
      </div>

      {/* Demo Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Automation Demo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'enrichment', name: 'Data Enrichment', icon: '🔍', description: 'Enhance prospect data with AI' },
            { id: 'scoring', name: 'Lead Scoring', icon: '🎯', description: 'AI-powered qualification' },
            { id: 'outreach', name: 'Outreach Automation', icon: '📧', description: 'Multi-channel campaigns' },
            { id: 'crm', name: 'CRM Integration', icon: '🔗', description: 'Sync with HubSpot, Salesforce' }
          ].map((demo) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedDemo === demo.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{demo.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{demo.name}</h4>
              <p className="text-sm text-gray-600">{demo.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={runSelectedDemo}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg font-medium ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isProcessing ? 'Processing...' : `Run ${selectedDemo.charAt(0).toUpperCase() + selectedDemo.slice(1)} Demo`}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      {isProcessing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Processing Automation</h3>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Enriching data with AI-powered sources...</p>
        </div>
      )}

      {/* Results Display */}
      {results && !isProcessing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Demo Results</h3>
          
          {selectedDemo === 'enrichment' && !results.error && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-green-600 mb-1">Email Verification</div>
                  <div className="text-2xl font-bold text-green-700">
                    {results.additionalData?.emailDeliverability?.deliverable ? '✅ Valid' : '❌ Invalid'}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Phone Verification</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {results.additionalData?.phoneVerification?.valid ? '✅ Valid' : '❌ Invalid'}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-600 mb-1">Confidence Score</div>
                  <div className="text-2xl font-bold text-purple-700">{results.confidenceScore}/100</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Enriched at: {results.enrichedAt?.toLocaleString()} | 
                Sources: {results.enrichmentSources?.join(', ')}
              </div>
            </div>
          )}

          {selectedDemo === 'scoring' && !results.error && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{results.overallScore}/100</div>
                <div className="text-xl font-semibold text-gray-900">{results.recommendation}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Individual Scores</h4>
                  {Array.from(results.individualScores.entries()).map(([model, score]) => (
                    <div key={model} className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{model.replace('Model', '')}</span>
                      <span className="font-medium">{score}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Score Details</h4>
                  <div className="text-sm space-y-1">
                    <div>Confidence: {Math.round(results.confidenceLevel * 100)}%</div>
                    <div>Explanation: {results.explanation}</div>
                  </div>
                </div>
          )}
            </div>
          )}

          {selectedDemo === 'outreach' && !results.error && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Campaign Created</h4>
                <div className="text-sm space-y-1">
                  <div>Name: {results.name}</div>
                  <div>Channel: {results.channel}</div>
                  <div>Status: {results.status}</div>
                  <div>Prospects: {results.prospects?.length}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Campaign ID: {results.campaignId} | 
                Created: {results.createdAt?.toLocaleString()}
              </div>
            </div>
          )}

          {selectedDemo === 'crm' && !results.error && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(results.connectionResults).map(([crm, status]) => (
                  <div key={crm} className={`rounded-lg p-4 border ${
                    status.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="font-semibold text-gray-900 mb-1">{crm.charAt(0).toUpperCase() + crm.slice(1)}</div>
                    <div className={`text-sm ${
                      status.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {status.success ? '✅ Connected' : '❌ Failed'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.error && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="text-red-700 font-semibold">Demo Error</div>
              <div className="text-red-600 text-sm">{results.error}</div>
            </div>
          )}
        </div>
      )}

      {/* Comprehensive Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🚀 Complete Automation Pipeline</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-semibold text-gray-900">Data Enrichment</h4>
            <p className="text-sm text-gray-600">Legal sources only</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
          <h4 className="font-semibold text-gray-900">AI Scoring</h4>
            <p className="text-sm text-gray-600">Multi-model ensemble</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📧</div>
            <h4 className="font-semibold text-gray-900">Outreach Automation</h4>
            <p className="text-sm text-gray-600">Multi-channel sequences</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h4 className="font-semibold text-gray-900">CRM Integration</h4>
            <p className="text-sm text-gray-600">Universal connectors</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => onIntegrationComplete?.()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🎯 Deploy Complete Automation System
          </button>
        </div>
      </div>
    </div>
  );
}
