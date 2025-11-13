/**
 * 30-Day Pilot Offer PDF Generator
 * 
 * Generates professional PDF proposals using @react-pdf/renderer
 */

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Submission {
  name: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
}

interface CallRecord {
  business_name?: string;
  business_description?: string;
  ideal_customer?: string;
  avg_customer_value?: number;
  current_leads_per_month?: number;
  capacity_per_month?: number;
  target_inquiries_min?: number;
  target_inquiries_max?: number;
  recommended_pilot_investment_min?: number;
  recommended_pilot_investment_max?: number;
  fit_level?: string;
  notes_for_campaign_strategy?: string;
}

interface PilotOfferPDFProps {
  submission: Submission;
  callRecord: CallRecord;
}

const PilotOfferPDF = ({ submission, callRecord }: PilotOfferPDFProps) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      fontSize: 11,
      color: '#1e293b',
    },
    header: {
      marginBottom: 30,
      borderBottom: '2 solid #2563eb',
      paddingBottom: 20,
    },
    companyName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      color: '#64748b',
      marginTop: 5,
    },
    section: {
      marginTop: 25,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: 12,
      borderBottom: '1 solid #e2e8f0',
      paddingBottom: 5,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    label: {
      fontSize: 10,
      color: '#64748b',
      width: '40%',
    },
    value: {
      fontSize: 11,
      color: '#1e293b',
      fontWeight: 'bold',
      width: '60%',
    },
    bulletList: {
      marginTop: 8,
      marginLeft: 15,
    },
    bulletItem: {
      fontSize: 10,
      color: '#1e293b',
      marginBottom: 6,
      lineHeight: 1.5,
    },
    paragraph: {
      fontSize: 10,
      color: '#1e293b',
      marginBottom: 10,
      lineHeight: 1.5,
    },
    highlight: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2563eb',
      marginTop: 8,
      marginBottom: 4,
    },
    guaranteeBox: {
      backgroundColor: '#f0f9ff',
      border: '2 solid #2563eb',
      borderRadius: 4,
      padding: 12,
      marginTop: 10,
    },
    guaranteeText: {
      fontSize: 10,
      color: '#1e293b',
      lineHeight: 1.5,
      fontStyle: 'italic',
    },
    footer: {
      marginTop: 40,
      paddingTop: 20,
      borderTop: '1 solid #e2e8f0',
      fontSize: 9,
      color: '#64748b',
      textAlign: 'center',
    },
    nextSteps: {
      marginTop: 15,
    },
    step: {
      fontSize: 10,
      color: '#1e293b',
      marginBottom: 8,
      lineHeight: 1.5,
    },
    stepNumber: {
      fontWeight: 'bold',
      color: '#2563eb',
    },
  });

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>Transition Marketing AI</Text>
          <Text style={styles.subtitle}>30-Day Pilot – Lead Generation Proposal</Text>
        </View>

        {/* Section 1: Client & Business Snapshot */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client & Business Snapshot</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Client Name:</Text>
            <Text style={styles.value}>{submission.name}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Business:</Text>
            <Text style={styles.value}>{callRecord.business_name || submission.name}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Industry:</Text>
            <Text style={styles.value}>{submission.industry}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{submission.city}</Text>
          </View>
          
          {callRecord.ideal_customer && (
            <View style={styles.row}>
              <Text style={styles.label}>Ideal Customer:</Text>
              <Text style={styles.value}>{callRecord.ideal_customer}</Text>
            </View>
          )}
          
          {callRecord.avg_customer_value && (
            <View style={styles.row}>
              <Text style={styles.label}>Average Customer Value:</Text>
              <Text style={styles.value}>{formatCurrency(callRecord.avg_customer_value)}</Text>
            </View>
          )}
          
          {callRecord.current_leads_per_month !== undefined && (
            <View style={styles.row}>
              <Text style={styles.label}>Current Inquiries/Month:</Text>
              <Text style={styles.value}>{callRecord.current_leads_per_month}</Text>
            </View>
          )}
          
          {callRecord.target_inquiries_min && callRecord.target_inquiries_max && (
            <View style={styles.row}>
              <Text style={styles.label}>Target Inquiries/Month:</Text>
              <Text style={styles.value}>
                {callRecord.target_inquiries_min}–{callRecord.target_inquiries_max}
              </Text>
            </View>
          )}
        </View>

        {/* Section 2: 30-Day Pilot Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>30-Day Pilot Plan</Text>
          
          {callRecord.target_inquiries_min && callRecord.target_inquiries_max && (
            <Text style={styles.paragraph}>
              <Text style={styles.highlight}>Goal:</Text> Bring you approximately{' '}
              {callRecord.target_inquiries_min}–{callRecord.target_inquiries_max} qualified inquiries in 30 days.
            </Text>
          )}
          
          <Text style={styles.paragraph}>
            <Text style={styles.highlight}>Channels:</Text> Google, Facebook, LinkedIn (exact mix decided during strategy).
          </Text>
          
          <Text style={styles.paragraph}>
            <Text style={styles.highlight}>What we do:</Text>
          </Text>
          
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Design and launch AI-optimized campaigns</Text>
            <Text style={styles.bulletItem}>• Target your ideal customer profile</Text>
            <Text style={styles.bulletItem}>• Verify each inquiry (remove junk and obvious spam)</Text>
            <Text style={styles.bulletItem}>• Deliver inquiries to your WhatsApp + dashboard</Text>
            <Text style={styles.bulletItem}>• Optimize campaigns weekly</Text>
          </View>
        </View>

        {/* Section 3: Investment & Guarantee */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment & Guarantee</Text>
          
          {callRecord.recommended_pilot_investment_min && callRecord.recommended_pilot_investment_max && (
            <Text style={styles.paragraph}>
              <Text style={styles.highlight}>Recommended pilot investment range:</Text>{' '}
              {formatCurrency(callRecord.recommended_pilot_investment_min)}–{formatCurrency(callRecord.recommended_pilot_investment_max)}{' '}
              (all-inclusive, including ad spend).
            </Text>
          )}
          
          <View style={styles.guaranteeBox}>
            <Text style={styles.guaranteeText}>
              <Text style={styles.highlight}>Guarantee:</Text> If we don't deliver the minimum number of inquiries we agree on at the start, 
              we will continue working for free until we do. No excuses. No extra fees.
            </Text>
          </View>
        </View>

        {/* Section 4: Why This Is a Fit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why This Is a Fit</Text>
          
          <View style={styles.bulletList}>
            {submission.industry && submission.city && (
              <Text style={styles.bulletItem}>
                • Your {submission.industry} business in {submission.city} has a clear high-ticket offer.
              </Text>
            )}
            
            {callRecord.capacity_per_month && (
              <Text style={styles.bulletItem}>
                • You have {callRecord.capacity_per_month} capacity to handle new inquiries.
              </Text>
            )}
            
            {callRecord.notes_for_campaign_strategy && (
              <Text style={styles.bulletItem}>
                • Our campaign strategy focuses on {callRecord.notes_for_campaign_strategy}
              </Text>
            )}
            
            {callRecord.fit_level && (
              <Text style={styles.bulletItem}>
                • Fit Level: {callRecord.fit_level}
              </Text>
            )}
          </View>
        </View>

        {/* Section 5: Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          
          <View style={styles.nextSteps}>
            <Text style={styles.step}>
              <Text style={styles.stepNumber}>Step 1:</Text> Reply YES to this proposal or confirm with your account manager.
            </Text>
            
            <Text style={styles.step}>
              <Text style={styles.stepNumber}>Step 2:</Text> We send you a payment link + simple one-page agreement.
            </Text>
            
            <Text style={styles.step}>
              <Text style={styles.stepNumber}>Step 3:</Text> Once payment is received, campaigns are launched within 3–5 working days.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Transition Marketing AI – AI-Powered Lead Generation & Marketing Automation in India</Text>
          <Text style={{ marginTop: 5 }}>https://transitionmarketingai.com</Text>
          <Text style={{ marginTop: 5 }}>
            Email: info@transitionmarketingai.com | WhatsApp: +91-888-888-8888
          </Text>
        </View>
      </Page>
    </Document>
  );
};

/**
 * Generate PDF buffer from submission and call record data
 */
export async function generatePilotOfferPDF({
  submission,
  callRecord,
}: {
  submission: Submission;
  callRecord: CallRecord;
}): Promise<Buffer> {
  try {
    // Validate required fields
    if (!callRecord.recommended_pilot_investment_min || !callRecord.recommended_pilot_investment_max) {
      throw new Error('Missing recommended pilot investment range');
    }
    
    if (!callRecord.target_inquiries_min || !callRecord.target_inquiries_max) {
      throw new Error('Missing target inquiries range');
    }

    // Create React element for PDF
    const PilotOfferPDFComponent = React.createElement(PilotOfferPDF, { submission, callRecord });
    const buffer = await renderToBuffer(PilotOfferPDFComponent);
    return Buffer.from(buffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error instanceof Error ? error : new Error('Failed to generate PDF');
  }
}

