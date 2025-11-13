'use client';

import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataFAQProps {
  faqs: FAQItem[];
}

export function StructuredDataFAQ({ faqs }: StructuredDataFAQProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || faqs.length === 0) {
      return;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-structured-data';
    script.text = JSON.stringify(structuredData);
    
    // Remove existing FAQ structured data if present
    const existing = document.getElementById('faq-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('faq-structured-data');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [faqs]);

  return null;
}

