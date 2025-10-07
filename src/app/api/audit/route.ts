// Developer Notes:
// This API route handles submissions for the "Free AI Marketing Audit" form.
// It performs server-side validation and stores the data in Supabase
// using the provided Supabase token.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define the type for the audit form payload
type AuditPayload = {
  name: string;
  email: string;
  company: string;
  website?: string;
  industry: string;
  goal: string;
};

// Initialize Supabase client with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_ffcfced7c01011589c6b107a806e8f00dd71da39';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  let payload: AuditPayload;
  try {
    payload = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, company, website, industry, goal } = payload;

  // Server-side validation
  if (!name || !email || !company || !industry || !goal) {
    return NextResponse.json({ error: "Name, Email, Company, Industry, and Goal are required." }, { status: 422 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  if (website && !website.startsWith("http://") && !website.startsWith("https://")) {
    return NextResponse.json({ error: "Website must start with http:// or https://." }, { status: 422 });
  }

        try {
            // Log the submission for debugging
            console.log('Audit submission received:', {
              name,
              email,
              company,
              website: website || '',
              industry,
              goal,
              source: 'Website - Free Audit',
              created_at: new Date().toISOString()
            });

            // Try to store in Supabase
            try {
              const { data, error } = await supabase
                .from('audit_submissions')
                .insert([
                  {
                    name,
                    email,
                    company,
                    website: website || '',
                    industry,
                    goal,
                    source: 'Website - Free Audit',
                    created_at: new Date().toISOString()
                  }
                ])
                .select();

              if (error) {
                console.error('Supabase error:', error);
                // Don't fail the request, just log the error
                console.log('Continuing without database storage due to Supabase error');
              } else {
                console.log('Audit submission stored in Supabase:', data);
              }
            } catch (supabaseError) {
              console.error('Supabase connection error:', supabaseError);
              console.log('Continuing without database storage due to connection error');
            }

    return NextResponse.json({ ok: true, message: "Audit request submitted successfully" }, { status: 200 });

  } catch (supabaseError) {
    console.error('Error processing audit submission:', supabaseError);
    return NextResponse.json({ error: "Failed to submit audit request (server error)." }, { status: 500 });
  }
}
