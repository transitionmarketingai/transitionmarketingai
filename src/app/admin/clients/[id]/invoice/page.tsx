'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  FileText,
  Download,
  Send,
  Plus,
  Trash2,
  Calendar,
  IndianRupee,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Client {
  id: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  location?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export default function InvoiceGeneratorPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [invoiceSuccess, setInvoiceSuccess] = useState(false);

  // Invoice data
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now()}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Lead Generation Service - Monthly Plan', quantity: 1, unit_price: 0, amount: 0 }
  ]);
  const [notes, setNotes] = useState('Thank you for your business!');
  const [paymentTerms, setPaymentTerms] = useState('Net 30 days');

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setClient(data.client);
        
        // Try to fetch custom plan to auto-fill amount
        const planResponse = await fetch(`/api/admin/clients/${clientId}/plan`);
        if (planResponse.ok) {
          const planData = await planResponse.json();
          if (planData.plan) {
            setItems([{
              description: `${planData.plan.plan_name} - Lead Generation Service`,
              quantity: 1,
              unit_price: planData.plan.monthly_cost,
              amount: planData.plan.monthly_cost
            }]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      toast.error('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    
    // Recalculate amount
    if (field === 'quantity' || field === 'unit_price') {
      updated[index].amount = updated[index].quantity * updated[index].unit_price;
    }
    
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleSave = async () => {
    if (!client) return;

    if (items.some(item => !item.description || item.unit_price <= 0)) {
      toast.error('Please fill in all item details');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          invoice_number: invoiceNumber,
          invoice_date: invoiceDate,
          due_date: dueDate,
          items,
          subtotal,
          tax,
          total,
          notes,
          payment_terms: paymentTerms,
          status: 'pending',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create invoice');
      }

      setInvoiceSuccess(true);
      toast.success('Invoice created successfully!');
      
      setTimeout(() => {
        router.push(`/admin/clients/${clientId}`);
      }, 2000);

    } catch (error: any) {
      console.error('Invoice creation error:', error);
      toast.error(error.message || 'Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    // For now, show a toast. In production, implement actual PDF generation
    toast.info('PDF generation coming soon! Invoice has been saved.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Client not found</p>
      </div>
    );
  }

  if (invoiceSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Invoice Created!</h2>
            <p className="text-slate-600 mb-6">Invoice {invoiceNumber} has been saved.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/admin/clients/${clientId}`}>View Client</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href={`/admin/clients/${clientId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Client
          </Link>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Invoice</h1>
            <p className="text-slate-600">Generate invoice for {client.business_name}</p>
          </div>
          <FileText className="h-12 w-12 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="invoice-number">Invoice Number</Label>
                  <Input
                    id="invoice-number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="invoice-date">Invoice Date</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Items</CardTitle>
                <Button variant="outline" size="sm" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4 relative">
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeItem(idx)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-6">
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(idx, 'description', e.target.value)}
                          placeholder="Service description"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Unit Price</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.unit_price}
                          onChange={(e) => updateItem(idx, 'unit_price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Amount</Label>
                        <div className="flex items-center h-10 px-3 border rounded-lg bg-slate-50">
                          <IndianRupee className="h-4 w-4 text-slate-400 mr-1" />
                          <span className="font-medium">{item.amount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 15 days">Net 15 days</SelectItem>
                    <SelectItem value="Net 30 days">Net 30 days</SelectItem>
                    <SelectItem value="Net 60 days">Net 60 days</SelectItem>
                    <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Additional notes or payment instructions"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Bill To */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bill To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-slate-900">{client.business_name}</p>
                <p className="text-slate-600">{client.contact_person}</p>
                <p className="text-slate-600">{client.email}</p>
                <p className="text-slate-600">{client.phone}</p>
                {client.location && <p className="text-slate-600">{client.location}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Amount Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">GST (18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Save Invoice
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>

              <Button
                variant="outline"
                className="w-full"
                disabled
              >
                <Send className="mr-2 h-4 w-4" />
                Send via Email
              </Button>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-green-900 mb-2">PAYMENT DETAILS</p>
              <div className="text-xs text-green-800 space-y-1">
                <p><strong>Bank:</strong> HDFC Bank</p>
                <p><strong>Account:</strong> 1234567890</p>
                <p><strong>IFSC:</strong> HDFC0001234</p>
                <p><strong>UPI:</strong> business@upi</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

