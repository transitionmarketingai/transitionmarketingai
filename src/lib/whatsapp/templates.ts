/**
 * WhatsApp message templates for Indian market
 */

export const whatsappTemplates = {
  weekly_summary: (params: {
    customerName: string;
    weekRange: string;
    totalLeads: string;
    avgQuality: string;
    dashboardUrl: string;
  }) => `📊 Weekly Lead Summary

Hi ${params.customerName},

Your lead delivery for ${params.weekRange}:

✅ Total Leads: ${params.totalLeads}
⭐ Avg Quality: ${params.avgQuality}/100
📧 CSV export sent via email
🔗 Dashboard: ${params.dashboardUrl}

All leads are verified and ready to contact.

Best,
Transition Marketing AI Team`,

  payment_link: (params: {
    customerName: string;
    amount: string;
    paymentUrl: string;
  }) => `💳 Payment Link Ready

Hi ${params.customerName},

Your invoice of ${params.amount} is ready.

Pay securely: ${params.paymentUrl}

Payment Methods:
✅ UPI (Google Pay, PhonePe, Paytm)
✅ Credit/Debit Cards
✅ Net Banking

Questions? Reply to this message.
Transition Marketing AI`,

  welcome_onboarding: (params: {
    customerName: string;
    planName: string;
    quota: string;
    dashboardUrl: string;
  }) => `🎉 Welcome to Transition Marketing AI!

Hi ${params.customerName},

Your ${params.planName} plan is activated!

📋 What's Next:
✓ Setup complete
✓ ${params.quota} leads/month guaranteed
✓ First leads in 24-48 hours
✓ Weekly delivery every Monday

🔗 Dashboard: ${params.dashboardUrl}

Questions? We're here to help!
Team Transition Marketing AI 🇮🇳`,

  payment_reminder: (params: {
    customerName: string;
    amount: string;
    dueDate: string;
    paymentUrl: string;
  }) => `⏰ Payment Reminder

Hi ${params.customerName},

Payment of ${params.amount} is due on ${params.dueDate}.

Pay now: ${params.paymentUrl}

To continue receiving verified leads, please complete payment.

Support: Reply for assistance.
Transition Marketing AI`,
};

