/**
 * Organization Schema for SEO
 * Adds structured data for Transition Marketing AI organization
 */
export function StructuredDataOrganization() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Transition Marketing AI',
    url: 'https://transitionmarketingai.com',
    logo: 'https://transitionmarketingai.com/branding/logo-header.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@transitionmarketingai.com',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      // Add social media links when available
      // 'https://www.linkedin.com/company/transition-marketing-ai',
      // 'https://twitter.com/transitionmarketingai',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

