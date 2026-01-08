import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      className="border-t bg-background"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" id="product-heading">Product</h3>
            <ul className="space-y-2" aria-labelledby="product-heading">
              <li>
                <Link
                  href="/agents"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Learn about our AI marketing agents"
                >
                  Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="View our pricing plans"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" id="company-heading">Company</h3>
            <ul className="space-y-2" aria-labelledby="company-heading">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Learn more about our company"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our blog posts"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" id="resources-heading">Resources</h3>
            <ul className="space-y-2" aria-labelledby="resources-heading">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Access our documentation"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Check our service status"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" id="legal-heading">Legal</h3>
            <ul className="space-y-2" aria-labelledby="legal-heading">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our privacy policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our terms of service"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 TransitionMarketingAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
