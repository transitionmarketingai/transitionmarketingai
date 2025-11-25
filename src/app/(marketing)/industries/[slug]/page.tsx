import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, ArrowRight, X, Target, Zap, TrendingUp, Shield, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface IndustryData {
  name: string;
  painPoints: string[];
  solutions: string[];
  expectedResults: {
    leadsPerMonth: string;
    conversionRate: string;
    sampleLead: {
      name: string;
      details: string;
      intent: string;
    };
  };
  caseStudy: {
    challenge: string;
    strategy: string;
    results: string;
    exampleInquiry: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const industryData: Record<string, IndustryData> = {
  'professional-services': {
    name: 'Professional Services',
    painPoints: [
      'High marketing costs with unpredictable ROI on traditional advertising',
      'Too many unqualified inquiries from people who can\'t afford your services',
      'Low conversion rates on Facebook and Google ads despite high spend',
      'Difficulty targeting decision-makers with the right budget and authority',
      'Time wasted on cold outreach that yields minimal results'
    ],
    solutions: [
      'AI-optimized ad campaigns that target businesses actively searching for your expertise',
      'Verified inquiries only from decision-makers with confirmed budgets',
      'WhatsApp automation handles initial consultations and follow-ups automatically',
      'AI tracking dashboard shows exactly which campaigns bring real clients',
      'Dedicated industry strategy tailored to professional services market',
      'Weekly delivery of verified inquiries directly to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '25-40 verified inquiries',
      conversionRate: '15-20%',
      sampleLead: {
        name: 'Rajesh Kumar, CEO, TechCorp Solutions',
        details: 'Needs legal compliance consulting • Budget: ₹2-3L • Timeline: Next 30 days',
        intent: 'High intent - actively comparing service providers'
      }
    },
    caseStudy: {
      challenge: 'A legal consultancy firm was spending ₹50,000/month on Google Ads but getting only 5-8 unqualified inquiries with no conversions.',
      strategy: 'We built AI-powered campaigns targeting businesses searching for compliance services, verified decision-maker contacts, and automated WhatsApp follow-ups.',
      results: 'Within 30 days, they received 32 verified inquiries from businesses with confirmed budgets. 6 converted to clients worth ₹18 lakhs in revenue.',
      exampleInquiry: 'Amit Patel, CFO of a growing fintech startup, needed urgent GST compliance help. Budget verified at ₹2.5L. Inquiry delivered via WhatsApp within 2 hours of ad click.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for professional services?',
        answer: 'Our AI analyzes search behavior and engagement signals to identify businesses actively looking for your services. We run targeted ads on Google, LinkedIn, and Facebook, then verify every inquiry to ensure they\'re from decision-makers with real budgets before delivery.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. Every inquiry we deliver is exclusive to your business. We never recycle data, never share leads across clients, and never deliver cold lists.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email address, confirmed business details, verified budget range, and clear intent signal from ad engagement. We verify all of this before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified inquiries within 7-14 days after we set up your campaigns. After that, you get fresh inquiries delivered every week based on your plan.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real inquiries from active paid campaigns, you can cancel immediately with no questions asked. We take the risk, you get the results.'
      }
    ]
  },
  'healthcare-wellness': {
    name: 'Healthcare & Wellness',
    painPoints: [
      'Expensive traditional advertising with low patient conversion rates',
      'Too many inquiries from people who can\'t afford treatment or aren\'t serious',
      'Difficulty reaching patients who need specialized treatments',
      'Manual follow-up processes lead to missed appointment opportunities',
      'High competition in healthcare marketing makes it hard to stand out'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting patients actively searching for your treatments',
      'Verified inquiries only from patients with confirmed needs and budgets',
      'WhatsApp automation handles appointment scheduling and follow-ups',
      'AI tracking dashboard tracks patient inquiries from first contact to appointment',
      'Dedicated healthcare marketing strategy compliant with medical advertising guidelines',
      'Weekly delivery of verified patient inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '50-75 verified inquiries',
      conversionRate: '20-25%',
      sampleLead: {
        name: 'Priya Sharma, Mumbai',
        details: 'Needs orthopedic consultation • Urgent timeline • Budget confirmed',
        intent: 'High intent - actively searching for treatment options'
      }
    },
    caseStudy: {
      challenge: 'A specialized orthopedic clinic was spending ₹75,000/month on newspaper ads and local listings but getting only 10-15 inquiries, most of which didn\'t convert to appointments.',
      strategy: 'We built AI campaigns targeting people searching for orthopedic treatments, verified patient contact information, and automated WhatsApp appointment booking.',
      results: 'Within 45 days, they received 68 verified patient inquiries. 17 booked consultations, and 12 became regular patients. Revenue increased by ₹4.5 lakhs in the first quarter.',
      exampleInquiry: 'Rajesh Kumar, a 45-year-old from Andheri, needed urgent knee replacement consultation. Inquiry delivered via WhatsApp with verified phone number and appointment preference. Booked consultation within 24 hours.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for healthcare providers?',
        answer: 'Our AI targets patients actively searching for your treatments on Google, Facebook, and health directories. We verify contact information and patient intent before delivering inquiries. All campaigns comply with medical advertising guidelines.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. Every inquiry we deliver is exclusive to your business. We never recycle data, never share leads across clients, and never deliver cold lists.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed location, verified treatment need, and clear intent from ad engagement. We verify all details before delivery to ensure quality.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified patient inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real patient inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'real-estate-builders': {
    name: 'Real Estate & Builders',
    painPoints: [
      'High cost of property advertising with low conversion to site visits',
      'Too many tire-kickers and time-wasters instead of serious buyers',
      'Difficulty finding buyers with verified budgets and purchase timelines',
      'Cold calling leads to low conversion rates and wasted sales team time',
      'Managing multiple lead sources becomes overwhelming and inefficient'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting serious property buyers with verified budgets',
      'Verified inquiries only from buyers actively searching for properties',
      'WhatsApp automation handles initial inquiries and site visit scheduling',
      'AI tracking dashboard tracks leads from inquiry to site visit to closure',
      'Dedicated real estate marketing strategy for property sales',
      'Weekly delivery of verified buyer inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '50-75 verified inquiries',
      conversionRate: '12-15%',
      sampleLead: {
        name: 'Priya Sharma, Mumbai',
        details: 'Looking for 2BHK in Andheri • Budget: ₹80L-₹1.2Cr • Timeline: Next 30 days',
        intent: 'High intent - actively visiting properties'
      }
    },
    caseStudy: {
      challenge: 'A real estate developer in Mumbai was spending ₹1.2 lakhs/month on property portals and newspaper ads but getting only 15-20 inquiries, most of which were tire-kickers with no real purchase intent.',
      strategy: 'We built AI campaigns targeting serious property buyers, verified budgets and timelines, and automated WhatsApp follow-ups for site visit scheduling.',
      results: 'Within 60 days, they received 72 verified buyer inquiries. 11 booked site visits, and 8 closed deals worth ₹9.6 crores. Marketing ROI improved from 2% to 15%.',
      exampleInquiry: 'Amit Patel, a 32-year-old IT professional, was actively searching for a 2BHK in Powai. Budget verified at ₹1.1 crores. Inquiry delivered via WhatsApp with property preferences. Scheduled site visit within 48 hours.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for real estate businesses?',
        answer: 'Our AI targets people actively searching for properties on Google, Facebook, and property portals. We verify buyer budgets, timelines, and property preferences before delivering inquiries. All inquiries come from live ad campaigns, not shared databases.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All buyer inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific property listings and locations. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed budget range, verified timeline, property preferences, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified buyer inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real buyer inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'dealerships-service-centers': {
    name: 'Dealerships & Service Centers',
    painPoints: [
      'High advertising costs with unpredictable vehicle sales conversions',
      'Too many inquiries from people who can\'t afford vehicles or aren\'t serious buyers',
      'Difficulty reaching customers ready to purchase or book services',
      'Manual follow-up processes lead to lost sales opportunities',
      'Competition from online platforms makes traditional advertising less effective'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting customers actively searching for vehicles or services',
      'Verified inquiries only from customers with confirmed budgets and purchase intent',
      'WhatsApp automation handles inquiries, test drive scheduling, and service bookings',
      'AI tracking dashboard tracks leads from inquiry to sale or service booking',
      'Dedicated automotive marketing strategy for dealerships and service centers',
      'Weekly delivery of verified customer inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '40-60 verified inquiries',
      conversionRate: '18-22%',
      sampleLead: {
        name: 'Rajesh Kumar, Bangalore',
        details: 'Looking for SUV • Budget: ₹15-20L • Timeline: Next 2 weeks',
        intent: 'High intent - actively comparing models and visiting showrooms'
      }
    },
    caseStudy: {
      challenge: 'A car dealership was spending ₹80,000/month on local newspaper ads and radio spots but getting only 12-15 inquiries, most of which didn\'t convert to test drives or sales.',
      strategy: 'We built AI campaigns targeting people actively searching for vehicles, verified budgets and preferences, and automated WhatsApp follow-ups for test drive scheduling.',
      results: 'Within 45 days, they received 58 verified buyer inquiries. 14 booked test drives, and 10 closed sales worth ₹1.8 crores. Marketing cost per sale dropped from ₹6.6L to ₹80,000.',
      exampleInquiry: 'Priya Sharma, a 28-year-old professional, was actively searching for a compact SUV. Budget verified at ₹18L. Inquiry delivered via WhatsApp with vehicle preferences. Scheduled test drive within 24 hours.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for dealerships and service centers?',
        answer: 'Our AI targets customers actively searching for vehicles or services on Google, Facebook, and automotive platforms. We verify contact information, budgets, and purchase intent before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All customer inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific inventory and services. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed budget range, verified vehicle/service preferences, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified customer inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real customer inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'retail-local-businesses': {
    name: 'Retail & Local Businesses',
    painPoints: [
      'High competition with online retailers makes local marketing expensive',
      'Limited marketing budget but need consistent customer flow',
      'Difficulty tracking which marketing channels actually bring customers',
      'Too many window shoppers instead of actual buyers',
      'Manual customer follow-up is time-consuming and inefficient'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting local customers actively searching for your products',
      'Verified inquiries only from customers with confirmed purchase intent',
      'WhatsApp automation handles customer inquiries and order confirmations',
      'AI tracking dashboard shows exactly which ads bring real customers',
      'Dedicated local business marketing strategy for retail stores',
      'Weekly delivery of verified customer inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '30-50 verified inquiries',
      conversionRate: '25-30%',
      sampleLead: {
        name: 'Amit Patel, Local Customer',
        details: 'Interested in home appliances • Budget: ₹50K-₹1L • Timeline: Immediate',
        intent: 'High intent - actively comparing products and prices'
      }
    },
    caseStudy: {
      challenge: 'A home appliances retailer was spending ₹40,000/month on local flyers and newspaper ads but getting only 8-10 inquiries, with low conversion to actual sales.',
      strategy: 'We built AI campaigns targeting local customers searching for appliances, verified contact information, and automated WhatsApp follow-ups for product inquiries.',
      results: 'Within 30 days, they received 42 verified customer inquiries. 12 made purchases worth ₹6.8 lakhs. Marketing ROI improved from 8% to 35%.',
      exampleInquiry: 'Suresh Kumar, a local homeowner, was actively searching for a refrigerator. Budget verified at ₹45,000. Inquiry delivered via WhatsApp with product preferences. Made purchase within 3 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for retail and local businesses?',
        answer: 'Our AI targets local customers actively searching for your products on Google, Facebook, and local directories. We verify contact information and purchase intent before delivering inquiries. All inquiries come from live ad campaigns targeting your service area.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All customer inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific products and local area. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed location, verified product interest, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified customer inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real customer inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'startups-saas': {
    name: 'Startups & SaaS',
    painPoints: [
      'High customer acquisition costs eating into startup margins',
      'Difficulty finding early adopters and beta testers for your product',
      'Need to scale marketing without hiring a large marketing team',
      'Low conversion rates on paid ads despite high spend',
      'Manual lead qualification takes too much time from product development'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting businesses that match your ideal customer profile',
      'Verified inquiries only from decision-makers with confirmed budgets',
      'WhatsApp automation handles initial product demos and follow-ups',
      'AI tracking dashboard tracks leads from inquiry to trial to customer',
      'Dedicated SaaS marketing strategy for B2B software companies',
      'Weekly delivery of verified inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '20-35 verified inquiries',
      conversionRate: '12-18%',
      sampleLead: {
        name: 'Amit Patel, CTO, TechStartup Inc.',
        details: 'Needs project management software • Budget: ₹50K-₹1L/year • Team: 25 people',
        intent: 'High intent - actively evaluating SaaS solutions'
      }
    },
    caseStudy: {
      challenge: 'A SaaS startup was spending ₹60,000/month on Google Ads but getting only 8-10 inquiries, most of which didn\'t convert to free trials or paid subscriptions.',
      strategy: 'We built AI campaigns targeting businesses actively searching for their type of software, verified decision-maker contacts, and automated WhatsApp follow-ups for product demos.',
      results: 'Within 45 days, they received 28 verified inquiries from qualified businesses. 5 signed up for annual plans worth ₹4.5 lakhs. Customer acquisition cost dropped from ₹7,500 to ₹2,100.',
      exampleInquiry: 'Rajesh Kumar, CTO of a growing fintech company, was actively searching for accounting software. Budget verified at ₹80K/year. Inquiry delivered via WhatsApp. Booked product demo within 48 hours.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for startups and SaaS companies?',
        answer: 'Our AI targets businesses actively searching for your type of software on Google, LinkedIn, and tech platforms. We verify decision-maker contacts, company size, and budget before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All business inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific software category and ideal customer profile. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed company details, verified decision-maker role, budget range, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified business inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real business inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'education-training': {
    name: 'Education & Training Providers',
    painPoints: [
      'High competition in online education makes student acquisition expensive',
      'Too many inquiries from people who can\'t afford courses or aren\'t serious',
      'Difficulty reaching students and professionals who need your training',
      'Manual enrollment processes slow down conversions',
      'Low conversion rates on education platform ads despite high spend'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting learners actively searching for your type of training',
      'Verified inquiries only from students with confirmed budgets and learning goals',
      'WhatsApp automation handles course inquiries and enrollment follow-ups',
      'AI tracking dashboard tracks leads from inquiry to enrollment to completion',
      'Dedicated education marketing strategy for training providers',
      'Weekly delivery of verified student inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '40-60 verified inquiries',
      conversionRate: '20-25%',
      sampleLead: {
        name: 'Priya Sharma, Professional',
        details: 'Interested in digital marketing course • Budget: ₹25K-₹50K • Timeline: Next month',
        intent: 'High intent - actively comparing training programs'
      }
    },
    caseStudy: {
      challenge: 'A digital marketing training institute was spending ₹50,000/month on education platform ads but getting only 12-15 inquiries, with low conversion to actual enrollments.',
      strategy: 'We built AI campaigns targeting professionals actively searching for marketing courses, verified contact information and budgets, and automated WhatsApp follow-ups for course enrollment.',
      results: 'Within 60 days, they received 55 verified student inquiries. 14 enrolled in courses worth ₹5.6 lakhs. Marketing ROI improved from 15% to 42%.',
      exampleInquiry: 'Amit Patel, a marketing professional, was actively searching for advanced SEO training. Budget verified at ₹35,000. Inquiry delivered via WhatsApp with course preferences. Enrolled within 5 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for education and training providers?',
        answer: 'Our AI targets learners actively searching for your type of training on Google, Facebook, and education platforms. We verify contact information, learning goals, and budgets before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All student inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific courses and training programs. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed learning goals, verified budget range, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified student inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real student inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'home-renovation': {
    name: 'Home & Renovation Services',
    painPoints: [
      'Finding homeowners ready to invest in renovations is challenging',
      'Seasonal fluctuations in demand make marketing unpredictable',
      'Too many inquiries from people who can\'t afford projects',
      'Managing quotes and follow-ups across multiple projects is time-consuming',
      'High competition from unorganized sector makes pricing difficult'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting homeowners actively planning renovations',
      'Verified inquiries only from homeowners with confirmed budgets and timelines',
      'WhatsApp automation handles project inquiries and quote follow-ups',
      'AI tracking dashboard organizes all inquiries with project status tracking',
      'Dedicated home renovation marketing strategy for contractors',
      'Weekly delivery of verified homeowner inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '35-55 verified inquiries',
      conversionRate: '22-28%',
      sampleLead: {
        name: 'Rajesh Kumar, Homeowner',
        details: 'Needs kitchen renovation • Budget: ₹3-5L • Timeline: Next 2 months',
        intent: 'High intent - actively getting quotes from multiple contractors'
      }
    },
    caseStudy: {
      challenge: 'A home renovation contractor was spending ₹45,000/month on local newspaper ads and flyers but getting only 10-12 inquiries, most of which didn\'t convert to projects.',
      strategy: 'We built AI campaigns targeting homeowners actively searching for renovation services, verified budgets and project timelines, and automated WhatsApp follow-ups for quote scheduling.',
      results: 'Within 45 days, they received 48 verified homeowner inquiries. 13 requested quotes, and 10 closed projects worth ₹42 lakhs. Marketing ROI improved from 12% to 38%.',
      exampleInquiry: 'Priya Sharma, a homeowner in Mumbai, was actively searching for bathroom renovation. Budget verified at ₹4.5L. Inquiry delivered via WhatsApp with project details. Scheduled site visit within 3 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for home renovation services?',
        answer: 'Our AI targets homeowners actively searching for renovation services on Google, Facebook, and home improvement platforms. We verify contact information, project budgets, and timelines before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All homeowner inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific services and service areas. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed project type, verified budget range, timeline, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified homeowner inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real homeowner inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'event-media-hospitality': {
    name: 'Event, Media & Hospitality',
    painPoints: [
      'Finding clients who need event planning or media services is unpredictable',
      'Unpredictable booking patterns make marketing planning difficult',
      'Too many inquiries from people who can\'t afford services',
      'Manual follow-ups lead to lost booking opportunities',
      'High competition in event and hospitality industry'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting businesses planning events or needing media services',
      'Verified inquiries only from decision-makers with confirmed budgets',
      'WhatsApp automation handles event inquiries and booking follow-ups',
      'AI tracking dashboard tracks leads from inquiry to booking to completion',
      'Dedicated event and hospitality marketing strategy',
      'Weekly delivery of verified client inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '30-50 verified inquiries',
      conversionRate: '18-23%',
      sampleLead: {
        name: 'Amit Patel, Marketing Manager, Corporate Events',
        details: 'Needs corporate event planning • Budget: ₹5-8L • Event: Next 2 months',
        intent: 'High intent - actively comparing event planners'
      }
    },
    caseStudy: {
      challenge: 'An event planning company was spending ₹60,000/month on social media ads but getting only 8-10 inquiries, with low conversion to actual bookings.',
      strategy: 'We built AI campaigns targeting businesses planning events, verified decision-maker contacts and budgets, and automated WhatsApp follow-ups for event consultations.',
      results: 'Within 60 days, they received 42 verified client inquiries. 9 booked events worth ₹58 lakhs. Marketing ROI improved from 18% to 45%.',
      exampleInquiry: 'Rajesh Kumar, Marketing Head of a tech company, was actively searching for corporate event planners. Budget verified at ₹6.5L. Inquiry delivered via WhatsApp with event details. Booked consultation within 48 hours.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for event, media, and hospitality businesses?',
        answer: 'Our AI targets businesses actively planning events or needing media services on Google, LinkedIn, and Facebook. We verify decision-maker contacts, budgets, and event timelines before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All client inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific services. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed company details, verified decision-maker role, budget range, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified client inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real client inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'travel-tour': {
    name: 'Travel & Tour Services',
    painPoints: [
      'Attracting travelers ready to book trips is challenging',
      'Seasonal demand makes marketing planning difficult',
      'High competition in travel industry drives up ad costs',
      'Too many inquiries from people who can\'t afford trips or aren\'t serious',
      'Manual booking follow-ups lead to lost opportunities'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting travelers actively planning trips',
      'Verified inquiries only from travelers with confirmed travel dates and budgets',
      'WhatsApp automation handles trip inquiries and booking follow-ups',
      'AI tracking dashboard tracks leads from inquiry to booking to travel',
      'Dedicated travel marketing strategy for tour operators',
      'Weekly delivery of verified traveler inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '40-60 verified inquiries',
      conversionRate: '20-25%',
      sampleLead: {
        name: 'Priya Sharma, Traveler',
        details: 'Planning family trip to Goa • Budget: ₹1-1.5L • Travel: Next month',
        intent: 'High intent - actively comparing tour packages'
      }
    },
    caseStudy: {
      challenge: 'A travel tour operator was spending ₹70,000/month on travel platform ads but getting only 15-18 inquiries, with low conversion to actual bookings.',
      strategy: 'We built AI campaigns targeting travelers actively planning trips, verified travel dates and budgets, and automated WhatsApp follow-ups for package bookings.',
      results: 'Within 45 days, they received 52 verified traveler inquiries. 12 booked trips worth ₹14.5 lakhs. Marketing ROI improved from 22% to 48%.',
      exampleInquiry: 'Amit Patel, a family traveler, was actively searching for Goa tour packages. Budget verified at ₹1.2L. Inquiry delivered via WhatsApp with travel preferences. Booked package within 5 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for travel and tour services?',
        answer: 'Our AI targets travelers actively planning trips on Google, Facebook, and travel platforms. We verify contact information, travel dates, and budgets before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All traveler inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific destinations and packages. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed travel dates, verified budget range, destination preferences, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified traveler inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real traveler inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'finance-insurance': {
    name: 'Finance & Insurance Services',
    painPoints: [
      'Finding clients who need financial products or insurance is challenging',
      'Regulatory compliance requirements make lead generation complex',
      'High cost per acquisition in financial services',
      'Too many inquiries from people who don\'t qualify for products',
      'Manual lead qualification and follow-up is time-consuming'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting individuals actively searching for financial products',
      'Verified inquiries only from qualified prospects with confirmed needs',
      'WhatsApp automation handles product inquiries and compliant follow-ups',
      'AI tracking dashboard tracks leads with compliance documentation',
      'Dedicated financial services marketing strategy compliant with regulations',
      'Weekly delivery of verified inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '25-40 verified inquiries',
      conversionRate: '15-20%',
      sampleLead: {
        name: 'Rajesh Kumar, Professional',
        details: 'Interested in term insurance • Budget: ₹50K-₹1L/year • Age: 35',
        intent: 'High intent - actively comparing insurance products'
      }
    },
    caseStudy: {
      challenge: 'An insurance agency was spending ₹80,000/month on financial platform ads but getting only 10-12 inquiries, most of which didn\'t qualify or convert to policies.',
      strategy: 'We built AI campaigns targeting people actively searching for insurance, verified contact information and qualification criteria, and automated compliant WhatsApp follow-ups.',
      results: 'Within 60 days, they received 32 verified inquiries from qualified prospects. 6 purchased policies worth ₹3.6 lakhs in annual premiums. Marketing ROI improved from 12% to 35%.',
      exampleInquiry: 'Priya Sharma, a 32-year-old professional, was actively searching for term insurance. Budget verified at ₹75K/year. Inquiry delivered via WhatsApp with product preferences. Policy application started within 3 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for finance and insurance services?',
        answer: 'Our AI targets individuals actively searching for financial products on Google, Facebook, and financial platforms. We verify contact information and qualification criteria before delivering inquiries. All campaigns comply with financial advertising regulations.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All client inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific products. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed product interest, verified qualification criteria, and clear intent from ad engagement. We verify all details before delivery while maintaining compliance.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified client inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real client inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'freelancers-creators': {
    name: 'Freelancers & Creators',
    painPoints: [
      'Finding clients who value your creative work is challenging',
      'Inconsistent income from project-based work',
      'Time spent on client acquisition instead of creating',
      'Too many inquiries from clients who can\'t afford your rates',
      'Difficulty competing with low-cost freelancer platforms'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting businesses actively looking for your services',
      'Verified inquiries only from clients with confirmed budgets',
      'WhatsApp automation handles project inquiries and proposal follow-ups',
      'AI tracking dashboard tracks leads from inquiry to project to payment',
      'Dedicated freelancer marketing strategy for creative professionals',
      'Weekly delivery of verified client inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '20-35 verified inquiries',
      conversionRate: '18-25%',
      sampleLead: {
        name: 'Amit Patel, Marketing Manager, Startup',
        details: 'Needs logo design • Budget: ₹25K-₹50K • Timeline: Next 2 weeks',
        intent: 'High intent - actively comparing designers'
      }
    },
    caseStudy: {
      challenge: 'A freelance graphic designer was spending ₹30,000/month on portfolio site ads but getting only 5-8 inquiries, most of which didn\'t convert to projects.',
      strategy: 'We built AI campaigns targeting businesses actively searching for design services, verified budgets and project timelines, and automated WhatsApp follow-ups for proposals.',
      results: 'Within 45 days, they received 28 verified client inquiries. 6 converted to projects worth ₹2.1 lakhs. Marketing ROI improved from 25% to 55%.',
      exampleInquiry: 'Rajesh Kumar, Marketing Head of a tech startup, was actively searching for brand identity design. Budget verified at ₹40K. Inquiry delivered via WhatsApp with project details. Started project within 7 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for freelancers and creators?',
        answer: 'Our AI targets businesses actively searching for your creative services on Google, LinkedIn, and professional platforms. We verify contact information, budgets, and project needs before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All client inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific services. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed company details, verified budget range, project timeline, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified client inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real client inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  },
  'logistics-b2b': {
    name: 'Logistics & B2B Service Providers',
    painPoints: [
      'Finding businesses that need logistics or B2B services is challenging',
      'Long sales cycles require consistent follow-up',
      'Manual lead management across multiple touchpoints is inefficient',
      'High cost per acquisition in B2B services',
      'Difficulty reaching decision-makers with budget authority'
    ],
    solutions: [
      'AI-optimized ad campaigns targeting businesses actively searching for your services',
      'Verified inquiries only from decision-makers with confirmed budgets',
      'WhatsApp automation handles initial inquiries and follow-ups',
      'CRM integration tracks leads through entire sales cycle',
      'Dedicated B2B marketing strategy for logistics and service providers',
      'Weekly delivery of verified business inquiries to your dashboard and WhatsApp'
    ],
    expectedResults: {
      leadsPerMonth: '30-45 verified inquiries',
      conversionRate: '12-18%',
      sampleLead: {
        name: 'Rajesh Kumar, Operations Manager, E-commerce Company',
        details: 'Needs logistics services • Budget: ₹5-10L/month • Volume: 1000+ orders',
        intent: 'High intent - actively comparing logistics providers'
      }
    },
    caseStudy: {
      challenge: 'A logistics company was spending ₹1 lakh/month on B2B platform ads but getting only 8-10 inquiries, with long sales cycles and low conversion.',
      strategy: 'We built AI campaigns targeting e-commerce and retail businesses actively searching for logistics, verified decision-maker contacts and volumes, and automated WhatsApp follow-ups for proposals.',
      results: 'Within 90 days, they received 38 verified business inquiries. 5 converted to clients worth ₹45 lakhs in annual revenue. Marketing ROI improved from 8% to 28%.',
      exampleInquiry: 'Amit Patel, Operations Head of a growing e-commerce company, was actively searching for warehousing and fulfillment services. Volume verified at 2000+ orders/month. Inquiry delivered via WhatsApp. Started partnership discussions within 5 days.'
    },
    faqs: [
      {
        question: 'How do AI campaigns work for logistics and B2B service providers?',
        answer: 'Our AI targets businesses actively searching for your services on Google, LinkedIn, and B2B platforms. We verify decision-maker contacts, company size, and service needs before delivering inquiries. All inquiries come from live ad campaigns.'
      },
      {
        question: 'Are inquiries exclusive to me?',
        answer: 'Yes. All business inquiries delivered to you are exclusive. They come from our AI-powered ad campaigns targeting your specific services. Once delivered, those inquiries are yours.'
      },
      {
        question: 'What is considered a "verified inquiry"?',
        answer: 'A verified inquiry includes: active phone number (tested), valid email, confirmed company details, verified decision-maker role, budget/volume requirements, and clear intent from ad engagement. We verify all details before delivery.'
      },
      {
        question: 'How soon will I see results?',
        answer: 'You\'ll receive your first batch of verified business inquiries within 7-14 days after campaign setup. After that, fresh inquiries are delivered every week to your dashboard and WhatsApp.'
      },
      {
        question: 'What happens if you don\'t deliver?',
        answer: 'We guarantee verified inquiries from live ad campaigns. If we don\'t deliver real business inquiries from active paid campaigns, you can cancel immediately. We take the risk, you get the results.'
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = industryData[params.slug];
  const industryName = industry?.name || 'Business';
  
  return {
    title: `AI Lead Generation for ${industryName} | Transition Marketing AI`,
    description: `Get verified inquiries every week for your ${industryName.toLowerCase()} business. AI-powered paid ad campaigns deliver real leads to your WhatsApp and dashboard.`,
    keywords: [
      `AI lead generation ${industryName.toLowerCase()}`,
      `${industryName.toLowerCase()} marketing India`,
      `verified inquiries ${industryName.toLowerCase()}`,
      'AI marketing automation',
      'paid ads automation'
    ],
    openGraph: {
      title: `AI Lead Generation for ${industryName} | Transition Marketing AI`,
      description: `Get verified inquiries every week for your ${industryName.toLowerCase()} business. AI-powered paid ad campaigns deliver real leads.`,
      type: "website",
      url: `https://transitionmarketingai.com/industries/${params.slug}`,
      images: [
        {
          url: "/images/dashboard-preview.png",
          width: 1200,
          height: 630,
          alt: `AI Lead Generation for ${industryName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Lead Generation for ${industryName} | Transition Marketing AI`,
      description: `Get verified inquiries every week for your ${industryName.toLowerCase()} business. AI-powered paid ad campaigns deliver real leads.`,
      images: ["/images/dashboard-preview.png"],
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industryData[params.slug];
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  if (!industry) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Industry not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Logo size="md" />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</Link>
              <Link href="/#results" className="text-gray-700 hover:text-gray-900 font-medium">Results</Link>
              <Link href="/insights" className="text-gray-700 hover:text-gray-900 font-medium">Insights</Link>
              <Link href="/#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book My Free Strategy Call</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            AI Lead Generation for {industry.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Get verified inquiries every week from real paid ad campaigns — delivered to your WhatsApp & dashboard.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book My Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Industry Pain Points */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Common Challenges for {industry.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.painPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 leading-relaxed text-lg">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our AI-Powered Solution */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our AI-Powered Solution
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              How we solve these challenges with AI-driven marketing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.solutions.map((solution, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-lg border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works For [Industry] */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works For {industry.name}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process to get you verified inquiries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Tell us about your business",
                description: "Share your target customers, service areas, and business goals. We'll customize our AI campaigns to match your needs.",
                icon: MessageCircle,
                color: "bg-blue-600"
              },
              {
                step: 2,
                title: "We build and run AI campaigns",
                description: "Our AI system creates and manages paid ad campaigns across Google, Facebook, and LinkedIn to find your ideal customers.",
                icon: Zap,
                color: "bg-green-600"
              },
              {
                step: 3,
                title: "You receive verified inquiries every week",
                description: "Real inquiries from live campaigns are delivered to your dashboard and WhatsApp every week. All contacts are verified before delivery.",
                icon: CheckCircle,
                color: "bg-purple-600"
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {item.step}
                      </div>
                      <Icon className={`h-8 w-8 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Expected Results for {industry.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">What You Can Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Leads per Month:</p>
                    <p className="text-2xl font-bold text-green-600">{industry.expectedResults.leadsPerMonth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Average Conversion Rate:</p>
                    <p className="text-2xl font-bold text-green-600">{industry.expectedResults.conversionRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">Example Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{industry.expectedResults.sampleLead.name}</p>
                    <p className="text-sm text-slate-700">{industry.expectedResults.sampleLead.details}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                    <p className="text-xs font-semibold text-green-900 mb-1">Intent Level:</p>
                    <p className="text-sm text-green-800">{industry.expectedResults.sampleLead.intent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Micro Case Study */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real Results for {industry.name}
            </h2>
          </div>
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Challenge
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{industry.caseStudy.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Strategy
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{industry.caseStudy.strategy}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Results
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{industry.caseStudy.results}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-400">
                  <p className="text-sm font-semibold text-slate-900 mb-2">Example Inquiry:</p>
                  <p className="text-slate-700">{industry.caseStudy.exampleInquiry}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing CTA Block */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose a Plan Based on Your Growth Goals
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            All plans include AI tracking dashboard + WhatsApp automation + weekly delivery.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book My Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {industry.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-lg border-2 border-slate-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Real Inquiries Every Week?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your free consultation now and see how AI-powered marketing can transform your {industry.name.toLowerCase()} business.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 font-semibold" asChild>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book My Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2025 Transition Marketing AI. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How It Works</Link>
              <Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</Link>
              <Link href="/insights" className="text-slate-400 hover:text-white transition-colors text-sm">Insights</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
