#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database migration...');

  try {
    // Create industry templates
    const industryTemplates = [
      {
        industryId: 'technology',
        name: 'Technology & Software',
        description: 'IT companies, software development, SaaS platforms',
        avgCostPerLead: 50,
        conversionRate: '12-18%',
        keyCities: ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
        targetKeywords: ['software', 'technology', 'IT', 'SaaS', 'AI'],
        idealRoles: ['CTO', 'VP Engineering', 'Head of Technology', 'Product Manager'],
        emailTemplates: {
          subject: 'Revolutionary AI Solution for {company}',
          body: 'Hi {firstName},\n\nI noticed {company} is leading innovation in {industry}. Our AI-powered lead generation platform has helped similar companies increase their pipeline by 300%.\n\nWould you be interested in a 15-minute demo?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, I saw {company} is doing amazing work in {industry}. Our AI platform has helped companies like yours generate 1000+ qualified leads monthly. Would love to share some insights that might be relevant to your growth goals.'
        },
        tags: ['tech', 'software', 'innovation', 'AI']
      },
      {
        industryId: 'finance',
        name: 'Financial Services',
        description: 'Banks, fintech, insurance, investment firms',
        avgCostPerLead: 75,
        conversionRate: '8-15%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
        targetKeywords: ['finance', 'banking', 'fintech', 'insurance', 'investment'],
        idealRoles: ['CFO', 'Head of Finance', 'Investment Manager', 'Risk Manager'],
        emailTemplates: {
          subject: 'Financial Growth Strategy for {company}',
          body: 'Hi {firstName},\n\n{company} has been making impressive strides in the financial sector. Our AI-driven lead generation platform has helped financial institutions increase their client acquisition by 250%.\n\nInterested in learning how?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} is doing excellent work in the financial space. Our AI platform has helped financial institutions generate high-quality leads and increase client acquisition. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['finance', 'banking', 'fintech', 'investment']
      },
      {
        industryId: 'healthcare',
        name: 'Healthcare & Medical',
        description: 'Hospitals, clinics, medical devices, pharma',
        avgCostPerLead: 60,
        conversionRate: '10-16%',
        keyCities: ['Chennai', 'Mumbai', 'Delhi', 'Bangalore'],
        targetKeywords: ['healthcare', 'medical', 'pharma', 'hospital', 'clinic'],
        idealRoles: ['Medical Director', 'Head of Operations', 'CEO', 'CFO'],
        emailTemplates: {
          subject: 'Healthcare Innovation for {company}',
          body: 'Hi {firstName},\n\n{company} is at the forefront of healthcare innovation. Our AI platform has helped healthcare organizations streamline their patient acquisition and improve operational efficiency.\n\nWould you like to explore how this could benefit {company}?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} is doing remarkable work in healthcare. Our AI platform has helped healthcare organizations improve patient acquisition and operational efficiency. Would love to share some insights that might be relevant to your goals.'
        },
        tags: ['healthcare', 'medical', 'pharma', 'hospital']
      },
      {
        industryId: 'manufacturing',
        name: 'Manufacturing & Industrial',
        description: 'Industrial manufacturing, automotive, textiles',
        avgCostPerLead: 45,
        conversionRate: '6-12%',
        keyCities: ['Pune', 'Chennai', 'Gurgaon', 'Bangalore'],
        targetKeywords: ['manufacturing', 'industrial', 'automotive', 'textiles', 'production'],
        idealRoles: ['Plant Manager', 'Operations Head', 'CEO', 'VP Operations'],
        emailTemplates: {
          subject: 'Manufacturing Excellence for {company}',
          body: 'Hi {firstName},\n\n{company} has built an impressive manufacturing operation. Our AI platform has helped manufacturing companies optimize their sales processes and increase market reach by 200%.\n\nInterested in learning more?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} has an impressive manufacturing setup. Our AI platform has helped manufacturing companies expand their market reach and optimize sales processes. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['manufacturing', 'industrial', 'automotive', 'production']
      },
      {
        industryId: 'education',
        name: 'Education & EdTech',
        description: 'Schools, colleges, online learning, educational technology',
        avgCostPerLead: 40,
        conversionRate: '8-14%',
        keyCities: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'],
        targetKeywords: ['education', 'edtech', 'learning', 'school', 'college'],
        idealRoles: ['Principal', 'Director', 'Head of Admissions', 'CEO'],
        emailTemplates: {
          subject: 'Educational Innovation for {company}',
          body: 'Hi {firstName},\n\n{company} is transforming education in India. Our AI platform has helped educational institutions increase student enrollment and improve outreach effectiveness by 180%.\n\nWould you like to explore how this could help {company}?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} is doing excellent work in education. Our AI platform has helped educational institutions improve student enrollment and outreach. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['education', 'edtech', 'learning', 'school']
      },
      {
        industryId: 'retail',
        name: 'Retail & E-commerce',
        description: 'Retail stores, e-commerce, fashion, consumer goods',
        avgCostPerLead: 35,
        conversionRate: '10-18%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
        targetKeywords: ['retail', 'ecommerce', 'fashion', 'consumer', 'shopping'],
        idealRoles: ['CEO', 'Marketing Head', 'Sales Director', 'Operations Manager'],
        emailTemplates: {
          subject: 'Retail Growth Strategy for {company}',
          body: 'Hi {firstName},\n\n{company} has built a strong presence in the retail market. Our AI platform has helped retail companies increase customer acquisition and boost sales by 220%.\n\nInterested in learning how?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} has a strong retail presence. Our AI platform has helped retail companies increase customer acquisition and boost sales. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['retail', 'ecommerce', 'fashion', 'consumer']
      },
      {
        industryId: 'consulting',
        name: 'Consulting & Professional Services',
        description: 'Management consulting, legal, accounting, advisory',
        avgCostPerLead: 80,
        conversionRate: '12-20%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
        targetKeywords: ['consulting', 'advisory', 'legal', 'accounting', 'professional'],
        idealRoles: ['Partner', 'Managing Director', 'CEO', 'Head of Business Development'],
        emailTemplates: {
          subject: 'Professional Growth for {company}',
          body: 'Hi {firstName},\n\n{company} has established itself as a leader in professional services. Our AI platform has helped consulting firms expand their client base and increase revenue by 300%.\n\nWould you like to explore how this could benefit {company}?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} is a leader in professional services. Our AI platform has helped consulting firms expand their client base and increase revenue. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['consulting', 'advisory', 'professional', 'services']
      },
      {
        industryId: 'realestate',
        name: 'Real Estate & Construction',
        description: 'Real estate developers, construction, property management',
        avgCostPerLead: 55,
        conversionRate: '6-12%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],
        targetKeywords: ['realestate', 'construction', 'property', 'development', 'housing'],
        idealRoles: ['CEO', 'Sales Director', 'Project Manager', 'Head of Sales'],
        emailTemplates: {
          subject: 'Real Estate Growth for {company}',
          body: 'Hi {firstName},\n\n{company} has been making significant contributions to the real estate sector. Our AI platform has helped real estate companies increase lead generation and boost sales by 250%.\n\nInterested in learning more?\n\nBest regards,\nTransition Marketing AI Team'
        },
        linkedinTemplates: {
          message: 'Hi {firstName}, {company} is doing excellent work in real estate. Our AI platform has helped real estate companies increase lead generation and boost sales. Would love to share some strategies that might benefit your growth.'
        },
        tags: ['realestate', 'construction', 'property', 'development']
      }
    ];

    console.log('📋 Creating industry templates...');
    for (const template of industryTemplates) {
      await prisma.industryTemplate.upsert({
        where: { industryId: template.industryId },
        update: template,
        create: template
      });
    }

    // Create credit packages
    const packages = [
      {
        name: 'Starter Pack',
        credits: 1000,
        price: 4999, // ₹49.99
        currency: 'INR',
        description: 'Perfect for small businesses getting started',
        features: ['1000 AI-generated leads', 'Basic templates', 'Email support'],
        isActive: true
      },
      {
        name: 'Growth Pack',
        credits: 5000,
        price: 19999, // ₹199.99
        currency: 'INR',
        description: 'For growing businesses with higher volume needs',
        features: ['5000 AI-generated leads', 'All templates', 'Priority support', 'Advanced analytics'],
        isActive: true
      },
      {
        name: 'Professional Pack',
        credits: 10000,
        price: 34999, // ₹349.99
        currency: 'INR',
        description: 'For established businesses and agencies',
        features: ['10000 AI-generated leads', 'Custom templates', 'Dedicated support', 'API access'],
        isActive: true
      },
      {
        name: 'Enterprise Pack',
        credits: 25000,
        price: 79999, // ₹799.99
        currency: 'INR',
        description: 'For large organizations with high-volume needs',
        features: ['25000 AI-generated leads', 'White-label options', 'Custom integrations', 'Dedicated account manager'],
        isActive: true
      }
    ];

    console.log('💰 Creating credit packages...');
    for (const pkg of packages) {
      await prisma.package.upsert({
        where: { name: pkg.name },
        update: pkg,
        create: pkg
      });
    }

    // Create message templates
    const messageTemplates = [
      {
        name: 'Indian Corporate Outreach',
        channel: 'EMAIL',
        subject: 'Partnership Opportunity for {company}',
        content: 'Namaste {firstName},\n\nI hope this message finds you well. I came across {company} and was impressed by your work in {industry}.\n\nAt Transition Marketing AI, we specialize in helping Indian businesses like yours generate high-quality leads and accelerate growth. Our AI-powered platform has helped companies across Mumbai, Delhi, Bangalore, and Chennai increase their pipeline by 300%.\n\nWould you be interested in a brief 15-minute call to explore how we can help {company} achieve its growth objectives?\n\nLooking forward to your response.\n\nBest regards,\nTransition Marketing AI Team\n🇮🇳',
        variables: ['firstName', 'company', 'industry'],
        industry: 'All',
        tags: ['corporate', 'partnership', 'indian'],
        isPublic: true,
        isActive: true
      },
      {
        name: 'Startup Founder Outreach',
        channel: 'EMAIL',
        subject: 'Growth Acceleration for {company}',
        content: 'Hi {firstName},\n\nI noticed {company} is making waves in the {industry} space. As a fellow entrepreneur, I understand the challenges of scaling a startup in India.\n\nOur AI-powered lead generation platform has helped 500+ Indian startups increase their customer acquisition by 250%. We specialize in targeting the Indian market with culturally relevant messaging and local business insights.\n\nWould you be open to a quick chat about how we can help {company} accelerate its growth?\n\nBest,\nTransition Marketing AI Team\n🚀',
        variables: ['firstName', 'company', 'industry'],
        industry: 'Technology',
        tags: ['startup', 'growth', 'entrepreneur'],
        isPublic: true,
        isActive: true
      },
      {
        name: 'LinkedIn Professional Connect',
        channel: 'LINKEDIN',
        subject: null,
        content: 'Hi {firstName},\n\nI saw your profile and was impressed by {company}\'s work in {industry}. Our AI platform has helped similar companies in India generate 1000+ qualified leads monthly.\n\nWould love to connect and share some insights that might be relevant to your growth goals.\n\nBest regards',
        variables: ['firstName', 'company', 'industry'],
        industry: 'All',
        tags: ['linkedin', 'professional', 'connect'],
        isPublic: true,
        isActive: true
      },
      {
        name: 'WhatsApp Business Follow-up',
        channel: 'WHATSAPP',
        subject: null,
        content: 'Hi {firstName},\n\nHope you\'re doing well! I sent you an email about our AI lead generation platform for {company}.\n\nJust wanted to follow up and see if you\'d be interested in a quick demo. We\'ve helped many Indian businesses like yours increase their sales pipeline significantly.\n\nLet me know if you\'d like to schedule a brief call.\n\nThanks!\n\nTransition Marketing AI Team',
        variables: ['firstName', 'company'],
        industry: 'All',
        tags: ['whatsapp', 'followup', 'demo'],
        isPublic: true,
        isActive: true
      }
    ];

    console.log('📧 Creating message templates...');
    for (const template of messageTemplates) {
      await prisma.messageTemplate.create({
        data: template
      });
    }

    console.log('✅ Database migration completed successfully!');
    console.log(`📊 Created ${industryTemplates.length} industry templates`);
    console.log(`💰 Created ${packages.length} credit packages`);
    console.log(`📧 Created ${messageTemplates.length} message templates`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
