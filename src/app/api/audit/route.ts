/**
 * Free AI Marketing Audit Form API Route
 * 
 * Handles form submissions for the audit request form on the homepage.
 * 
 * Environment Variables (optional):
 * - AIRTABLE_API_KEY: Your Airtable API key
 * - AIRTABLE_BASE_ID: Your Airtable base ID
 * - AIRTABLE_TABLE_AUDITS: Table name for audit submissions
 * 
 * If Airtable env vars are not set, submissions will be logged to console.
 * 
 * POST /api/audit
 * Body: { name, email, company, website?, industry, goal }
 */

type AuditPayload = {
  name: string;
  email: string;
  company: string;
  website?: string;
  industry: string;
  goal: string;
};

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const body: AuditPayload = await req.json();
    const { name, email, company, website, industry, goal } = body;

    // Server-side validation
    if (!name || !email || !company || !industry || !goal) {
      return Response.json(
        { error: "All required fields must be provided" },
        { status: 422 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 422 }
      );
    }

    // Website validation (optional but if present must be valid)
    if (website && !website.startsWith("http://") && !website.startsWith("https://")) {
      return Response.json(
        { error: "Website must start with http:// or https://" },
        { status: 422 }
      );
    }

    // Prepare payload for storage
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      website: website?.trim() || "",
      industry,
      goal: goal.trim(),
      source: "Website - Free Audit",
      createdAt: new Date().toISOString()
    };

    // Check if Airtable environment variables exist
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTable = process.env.AIRTABLE_TABLE_AUDITS;

    if (airtableApiKey && airtableBaseId && airtableTable) {
      // Store in Airtable
      try {
        const airtableResponse = await fetch(
          `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTable)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${airtableApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: {
                Name: payload.name,
                Email: payload.email,
                Company: payload.company,
                Website: payload.website,
                Industry: payload.industry,
                Goal: payload.goal,
                Source: payload.source,
                CreatedAt: payload.createdAt
              }
            })
          }
        );

        if (!airtableResponse.ok) {
          const errorText = await airtableResponse.text();
          console.error("Airtable API error:", errorText);
          return Response.json(
            { error: "Failed to save your submission. Please try again." },
            { status: 502 }
          );
        }

        console.log("Audit submission saved to Airtable:", payload);
      } catch (error) {
        console.error("Airtable request failed:", error);
        return Response.json(
          { error: "Failed to save your submission. Please try again." },
          { status: 502 }
        );
      }
    } else {
      // Fallback: log to console
      console.log("AUDIT_SUBMISSION", payload);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}

