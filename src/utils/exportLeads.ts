// Lead Export Utility
// Converts leads to CSV and triggers download

interface Lead {
  id: number;
  company: string;
  contact_name: string;
  email: string;
  phone?: string;
  website: string;
  industry: string;
  location: string;
  company_size: string;
  ai_score: number;
  status: string;
  created_at: string;
}

export function exportLeadsToCSV(leads: Lead[], filename = 'leads-export.csv') {
  if (!leads || leads.length === 0) {
    throw new Error('No leads to export');
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Company',
    'Contact Name',
    'Email',
    'Phone',
    'Website',
    'Industry',
    'Location',
    'Company Size',
    'AI Score',
    'Status',
    'Created Date',
  ];

  // Convert leads to CSV rows
  const rows = leads.map((lead) => [
    lead.id,
    lead.company,
    lead.contact_name,
    lead.email,
    lead.phone || '',
    lead.website,
    lead.industry,
    lead.location,
    lead.company_size,
    lead.ai_score,
    lead.status,
    new Date(lead.created_at).toLocaleDateString(),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => 
      row.map((cell) => {
        // Escape cells containing commas or quotes
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    ),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function getExportFilename(prefix = 'leads') {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  return `${prefix}-${date}-${time}.csv`;
}

