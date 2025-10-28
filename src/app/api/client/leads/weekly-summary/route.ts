import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWhatsAppTemplate, formatPhoneForWhatsApp } from '@/lib/whatsapp/notifications';
import nodemailer from 'nodemailer';

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { client_id, week_start, week_end } = await request.json();

    // Fetch client details
    const { data: client } = await supabase
      .from('clients')
      .select('*')
      .eq('id', client_id)
      .single();

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Fetch leads delivered this week
    const { data: leads } = await supabase
      .from('leads_delivered')
      .select('*')
      .eq('client_id', client_id)
      .gte('delivered_at', week_start)
      .lte('delivered_at', week_end)
      .order('delivered_at', { ascending: false });

    const totalLeads = leads?.length || 0;
    const avgQualityScore = leads?.reduce((sum, lead) => sum + (lead.quality_score || 0), 0) / (totalLeads || 1);
    const sourcesBreakdown = leads?.reduce((acc: any, lead: any) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});

    // Generate CSV content
    const csvHeader = 'Name,Company,Phone,Email,Source,Quality Score,Delivered Date\n';
    const csvRows = leads?.map((lead: any) => 
      `"${lead.name || ''}","${lead.company || ''}","${lead.phone || ''}","${lead.email || ''}","${lead.source || ''}",${lead.quality_score || 0},"${lead.delivered_at || ''}"`
    ).join('\n') || '';
    const csvContent = csvHeader + csvRows;

    // Send WhatsApp notification
    if (client.phone) {
      try {
        await sendWhatsAppTemplate(
          formatPhoneForWhatsApp(client.phone),
          'weekly_summary',
          {
            customerName: client.contact_person,
            weekRange: `${new Date(week_start).toLocaleDateString('en-IN')} - ${new Date(week_end).toLocaleDateString('en-IN')}`,
            totalLeads: totalLeads.toString(),
            avgQuality: Math.round(avgQualityScore).toString(),
            dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard`,
          }
        );
      } catch (error) {
        console.error('WhatsApp send error:', error);
      }
    }

    // Send email with CSV attachment
    if (client.email) {
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Weekly Lead Summary</h2>
          <p>Hi ${client.contact_person},</p>
          
          <p>Here's your weekly lead delivery summary:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📊 Weekly Stats</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Total Leads:</strong> ${totalLeads}</li>
              <li style="margin: 10px 0;"><strong>Average Quality Score:</strong> ${Math.round(avgQualityScore)}/100</li>
              <li style="margin: 10px 0;"><strong>Week:</strong> ${new Date(week_start).toLocaleDateString('en-IN')} - ${new Date(week_end).toLocaleDateString('en-IN')}</li>
            </ul>
          </div>

          ${Object.keys(sourcesBreakdown || {}).length > 0 ? `
            <h4>Lead Sources:</h4>
            <ul>
              ${Object.entries(sourcesBreakdown || {}).map(([source, count]: [string, any]) => 
                `<li>${source}: ${count} leads</li>`
              ).join('')}
            </ul>
          ` : ''}

          <p style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Dashboard
            </a>
          </p>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            CSV export is attached. All leads are verified and ready to contact.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
        to: client.email,
        subject: `Weekly Lead Summary - ${totalLeads} New Leads`,
        html: emailBody,
        attachments: [
          {
            filename: `leads-week-${week_start}.csv`,
            content: csvContent,
          },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly summary sent',
      stats: {
        totalLeads,
        avgQualityScore: Math.round(avgQualityScore),
        sourcesBreakdown,
      },
    });

  } catch (error: any) {
    console.error('Weekly summary error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send weekly summary' },
      { status: 500 }
    );
  }
}

