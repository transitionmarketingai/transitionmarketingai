import { NextRequest, NextResponse } from 'next/server';
import { enrichLead, batchEnrichLeads } from '@/lib/lead-enrichment/enricher';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if it's a single lead or batch enrichment
    if (body.leads && Array.isArray(body.leads)) {
      // Batch enrichment
      const enrichmentResults = await batchEnrichLeads(body.leads);
      
      return NextResponse.json({
        success: true,
        count: enrichmentResults.size,
        enrichments: Object.fromEntries(enrichmentResults),
      });
    } else {
      // Single lead enrichment
      const { name, email, phone, company, location } = body;
      
      if (!name) {
        return NextResponse.json(
          { error: 'Lead name is required' },
          { status: 400 }
        );
      }
      
      const enrichmentData = await enrichLead({
        name,
        email,
        phone,
        company,
        location,
      });
      
      return NextResponse.json({
        success: true,
        enrichment: enrichmentData,
      });
    }
  } catch (error) {
    console.error('Lead Enrichment Error:', error);
    return NextResponse.json(
      { error: 'Failed to enrich lead' },
      { status: 500 }
    );
  }
}

