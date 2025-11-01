/**
 * Invoice PDF Generator
 * 
 * Generates professional PDF invoices using @react-pdf/renderer
 */

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Invoice PDF Component
interface InvoicePDFProps {
  invoice: any;
  client: any;
}

const InvoicePDF = ({ invoice, client }: InvoicePDFProps) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 30,
      borderBottom: '2 solid #2563eb',
      paddingBottom: 20,
    },
    companyName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: 5,
    },
    companyAddress: {
      fontSize: 10,
      color: '#64748b',
      marginTop: 5,
    },
    invoiceTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: 10,
    },
    invoiceDetails: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    invoiceInfo: {
      width: '48%',
    },
    label: {
      fontSize: 10,
      color: '#64748b',
      marginTop: 8,
    },
    value: {
      fontSize: 12,
      color: '#1e293b',
      fontWeight: 'bold',
      marginTop: 2,
    },
    section: {
      marginTop: 30,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: 10,
    },
    table: {
      marginTop: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f1f5f9',
      padding: 8,
      borderRadius: 4,
    },
    tableRow: {
      flexDirection: 'row',
      padding: 8,
      borderBottom: '1 solid #e2e8f0',
    },
    tableCell: {
      fontSize: 10,
      color: '#1e293b',
    },
    colDescription: {
      width: '40%',
    },
    colQuantity: {
      width: '15%',
      textAlign: 'right',
    },
    colPrice: {
      width: '22%',
      textAlign: 'right',
    },
    colTotal: {
      width: '23%',
      textAlign: 'right',
      fontWeight: 'bold',
    },
    totals: {
      marginTop: 20,
      alignItems: 'flex-end',
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '40%',
      marginBottom: 8,
    },
    totalLabel: {
      fontSize: 11,
      color: '#64748b',
    },
    totalValue: {
      fontSize: 11,
      color: '#1e293b',
      fontWeight: 'bold',
    },
    grandTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '40%',
      marginTop: 10,
      paddingTop: 10,
      borderTop: '2 solid #2563eb',
    },
    grandTotalLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1e293b',
    },
    grandTotalValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#2563eb',
    },
    notes: {
      marginTop: 30,
      padding: 15,
      backgroundColor: '#f8fafc',
      borderRadius: 4,
    },
    notesTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: 5,
    },
    notesText: {
      fontSize: 10,
      color: '#64748b',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: 'center',
      fontSize: 8,
      color: '#94a3b8',
    },
  });

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>Transition Marketing AI</Text>
          <Text style={styles.companyAddress}>
            Lead Generation Services{'\n'}
            India
          </Text>
        </View>

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>INVOICE</Text>

        {/* Invoice Details */}
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.value}>{client.company_name}</Text>
            {client.contact_person && (
              <Text style={styles.value}>{client.contact_person}</Text>
            )}
            {client.location && (
              <Text style={styles.companyAddress}>{client.location}</Text>
            )}
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.value}>{invoice.invoice_number}</Text>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.value}>{formatDate(invoice.invoice_date)}</Text>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{formatDate(invoice.due_date)}</Text>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.colDescription]}>Description</Text>
              <Text style={[styles.tableCell, styles.colQuantity]}>Qty</Text>
              <Text style={[styles.tableCell, styles.colPrice]}>Unit Price</Text>
              <Text style={[styles.tableCell, styles.colTotal]}>Total</Text>
            </View>
            {/* Table Rows */}
            {invoice.line_items?.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.colDescription]}>
                  {item.description || 'Service'}
                </Text>
                <Text style={[styles.tableCell, styles.colQuantity]}>
                  {item.quantity || 1}
                </Text>
                <Text style={[styles.tableCell, styles.colPrice]}>
                  {formatCurrency(item.unit_price || 0)}
                </Text>
                <Text style={[styles.tableCell, styles.colTotal]}>
                  {formatCurrency((item.quantity || 1) * (item.unit_price || 0))}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.amount)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST (18%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.tax_amount)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total Amount:</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total_amount)}</Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes:</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business! Please pay within {new Date(invoice.due_date).getDate() - new Date(invoice.invoice_date).getDate()} days.
        </Text>
      </Page>
    </Document>
  );
};

/**
 * Generate PDF buffer from invoice data
 */
export async function generateInvoicePDF({ invoice, client }: { invoice: any; client: any }): Promise<Buffer> {
  try {
    // Create React element for PDF
    const InvoicePDFComponent = React.createElement(InvoicePDF, { invoice, client });
    const buffer = await renderToBuffer(InvoicePDFComponent);
    return Buffer.from(buffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  }
}

