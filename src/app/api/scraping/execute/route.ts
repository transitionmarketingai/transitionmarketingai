import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST - Execute scraping campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get the campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('scraping_campaigns')
      .select('*')
      .eq('id', body.campaign_id)
      .eq('customer_id', customer.id)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Update campaign with execution info
    const { error: updateError } = await supabase
      .from('scraping_campaigns')
      .update({
        last_run_at: new Date().toISOString(),
        total_runs: campaign.total_runs + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', campaign.id);

    if (updateError) {
      console.error('Update campaign execution error:', updateError);
      return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
    }

    // Simulate scraping process (in real implementation, this would trigger background job)
    const mockContacts = [
      {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@example.com',
        company: 'Tech Solutions Pvt Ltd',
        city: 'Mumbai',
        state: 'Maharashtra',
        quality_score: 85,
        source_url: 'https://maps.google.com/place/123',
        source_platform: 'google_maps',
      },
      {
        name: 'Priya Sharma',
        phone: '+91 98765 43211',
        email: 'priya@example.com',
        company: 'Digital Marketing Agency',
        city: 'Delhi',
        state: 'Delhi',
        quality_score: 78,
        source_url: 'https://maps.google.com/place/456',
        source_platform: 'google_maps',
      },
      {
        name: 'Amit Patel',
        phone: '+91 98765 43212',
        email: 'amit@example.com',
        company: 'E-commerce Startup',
        city: 'Bangalore',
        state: 'Karnataka',
        quality_score: 92,
        source_url: 'https://maps.google.com/place/789',
        source_platform: 'google_maps',
      },
    ];

    // Filter contacts by quality threshold
    const qualifiedContacts = mockContacts.filter(
      contact => contact.quality_score >= campaign.quality_threshold
    );

    // Insert contacts into database
    const contactsToInsert = qualifiedContacts.map(contact => ({
      customer_id: customer.id,
      campaign_id: campaign.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company: contact.company,
      city: contact.city,
      state: contact.state,
      quality_score: contact.quality_score,
      source_url: contact.source_url,
      source_platform: contact.source_platform,
      verification_status: 'unverified',
    }));

    const { data: insertedContacts, error: insertError } = await supabase
      .from('contacts')
      .insert(contactsToInsert)
      .select();

    if (insertError) {
      console.error('Insert contacts error:', insertError);
      return NextResponse.json({ error: 'Failed to save contacts' }, { status: 500 });
    }

    // Update campaign with results
    const { error: updateResultsError } = await supabase
      .from('scraping_campaigns')
      .update({
        contacts_generated: campaign.contacts_generated + insertedContacts.length,
        successful_runs: campaign.successful_runs + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', campaign.id);

    if (updateResultsError) {
      console.error('Update campaign results error:', updateResultsError);
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'campaign_update',
      title: 'Scraping Campaign Completed',
      message: `Campaign "${campaign.name}" generated ${insertedContacts.length} new contacts`,
      campaign_id: campaign.id,
      priority: 'normal',
    });

    return NextResponse.json({
      success: true,
      contacts_generated: insertedContacts.length,
      contacts: insertedContacts,
    });

  } catch (error: any) {
    console.error('Execute scraping campaign error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}