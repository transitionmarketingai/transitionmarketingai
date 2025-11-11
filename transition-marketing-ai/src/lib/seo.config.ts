import { type DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | Transition Marketing AI",
  defaultTitle: "Transition Marketing AI",
  description:
    "Transition Marketing AI helps ambitious teams plan, launch, and optimize AI-driven marketing transitions with human-first strategy.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://transitionmarketing.ai",
    siteName: "Transition Marketing AI",
    images: [
      {
        url: "https://transitionmarketing.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    handle: "@transitionmarketingai",
    site: "@transitionmarketingai",
  },
  additionalMetaTags: [
    {
      property: "theme-color",
      content: "#266EFF",
    },
  ],
};
