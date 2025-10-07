"use client";

import { useState } from "react";

export default function AuditForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    industry: "",
    goal: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    const { name, email, company, industry, goal, website } = formData;
    
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!company.trim()) return "Company is required";
    if (!industry) return "Industry is required";
    if (!goal.trim()) return "Goal is required";
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    
    // Website validation (optional but if present must be valid)
    if (website && !website.startsWith("http://") && !website.startsWith("https://")) {
      return "Website must start with http:// or https://";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          industry: "",
          goal: ""
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-50 mb-2">Thanks!</h3>
        <p className="text-slate-300">Your audit request is in. We'll email you within 24–48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Your full name"
            required
            aria-invalid={error && !formData.name.trim() ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="you@company.com"
            required
            aria-invalid={error && !formData.email.trim() ? "true" : "false"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Your company name"
            required
            aria-invalid={error && !formData.company.trim() ? "true" : "false"}
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="https://yourcompany.com"
            aria-invalid={error && formData.website && !formData.website.startsWith("http") ? "true" : "false"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
          Industry *
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
          aria-invalid={error && !formData.industry ? "true" : "false"}
        >
          <option value="">Select your industry</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Coaching/Training">Coaching/Training</option>
          <option value="Retail/Local">Retail/Local</option>
          <option value="SaaS/Startup">SaaS/Startup</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
          Goal *
        </label>
        <textarea
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          placeholder="What are your main marketing goals? (e.g., generate more leads, increase brand awareness, drive sales)"
          required
          aria-invalid={error && !formData.goal.trim() ? "true" : "false"}
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-cyan-500 to-green-500 text-slate-900 font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Request Audit"}
        </button>
      </div>
    </form>
  );
}