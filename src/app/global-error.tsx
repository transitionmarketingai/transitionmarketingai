'use client';

import { ErrorPage } from '@/components/ErrorBoundary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorPage
          statusCode={500}
          title="Something went wrong"
          message="An unexpected error occurred. Please try again."
        />
      </body>
    </html>
  );
}


