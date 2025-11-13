import Script from 'next/script';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'product' | 'service';
  data?: any;
}

export default function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Transition Marketing AI",
      "description": "AI-powered verified lead generation for Indian businesses — 30–50 real inquiries in 30 days, backed by a performance guarantee.",
      "url": "https://transitionmarketingai.com",
      "logo": "https://transitionmarketingai.com/logo.png",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "email": "info@transitionmarketingai.com",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressLocality": "India"
      },
      "sameAs": [
        "https://linkedin.com/company/transitionmarketingai",
        "https://twitter.com/transitionai"
      ],
      "offers": {
        "@type": "Offer",
        "name": "30-Day Pilot - Verified Lead Generation",
        "description": "AI-powered verified lead generation with performance guarantee",
        "price": "35000",
        "priceCurrency": "INR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "35000",
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": true
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01"
      }
    };

    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Transition Marketing AI",
          "url": "https://transitionmarketingai.com",
          "description": "Automated AI marketing systems for Indian SMBs",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://transitionmarketingai.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
      
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI Marketing Automation",
          "description": "Get qualified leads, consistent content, and smart AI tools in one subscription",
          "provider": baseData,
          "serviceType": "Marketing Automation",
          "areaServed": "IN",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Marketing Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Lead Generation",
                  "description": "Automated lead generation and qualification"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Content Creation",
                  "description": "AI-powered content creation and management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Marketing Analytics",
                  "description": "Comprehensive marketing analytics and reporting"
                }
              }
            ]
          }
        };
      
      default:
        return baseData;
    }
  };

  const structuredData = data || getStructuredData();

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}


