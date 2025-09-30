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
      "description": "Get qualified leads, consistent content, and smart AI tools in one subscription. Built for Indian SMBs. No hiring. No hassle.",
      "url": "https://transitionmarketingai.com",
      "logo": "https://transitionmarketingai.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "email": "info@transitionmarketingai.com"
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
        "name": "AI Marketing Subscription",
        "description": "Automated AI marketing systems for Indian SMBs",
        "price": "999",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
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
