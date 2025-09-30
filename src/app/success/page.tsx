import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        Success — You&apos;re in!
      </h1>
      
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
        <p className="text-slate-300 text-lg mb-6">
          We&apos;ve received your subscription. You&apos;ll get an email with access details shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-green-500 text-slate-900 font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-center"
          >
            Go to Home
          </Link>
          <a
            href="mailto:hello@transitionmarketingai.com"
            className="w-full sm:w-auto border border-slate-700 text-slate-50 font-semibold px-8 py-3 rounded-xl hover:bg-slate-800/50 transition-colors text-center"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}

