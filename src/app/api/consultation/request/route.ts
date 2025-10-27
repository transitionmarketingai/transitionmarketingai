import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      message,
      preferredTime,
      preferredDay,
      whatsappUpdates,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient();

    // Insert consultation request into database
    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        industry: industry || null,
        message: message || null,
        preferred_time: preferredTime || null,
        preferred_day: preferredDay || null,
        whatsapp_updates: whatsappUpdates || false,
        status: 'pending',
        source: 'website',
      })
      .select()
      .single();

    if (consultationError) {
      console.error('Consultation creation error:', consultationError);
      return NextResponse.json(
        { error: 'Failed to create consultation request' },
        { status: 500 }
      );
    }

    // TODO: Send notification to admin (email/Slack/WhatsApp)
    // TODO: If whatsappUpdates is true, send WhatsApp confirmation to customer

    return NextResponse.json(
      {
        success: true,
        consultation,
        message: "We'll call you within 24 hours",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Consultation request error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

