/**
 * Forecast Data Aggregator
 * Aggregates historical data from Airtable for forecasting
 */

interface HistoricalData {
  leads: {
    month: string;
    count: number;
    byIndustry: Record<string, number>;
    conversionRate: number;
  }[];
  revenue: {
    month: string;
    mrr: number;
    totalRevenue: number;
  }[];
  clients: {
    month: string;
    active: number;
    churned: number;
    churnRate: number;
    byIndustry: Record<string, { active: number; churned: number }>;
  }[];
  tasks: {
    month: string;
    completed: number;
    total: number;
    completionRate: number;
  }[];
}

export async function aggregateHistoricalData(months: number = 12): Promise<HistoricalData> {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;

  if (!airtableApiKey || !airtableBaseId) {
    throw new Error('Airtable not configured');
  }

  const now = new Date();
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - months);

  // Initialize data structure
  const data: HistoricalData = {
    leads: [],
    revenue: [],
    clients: [],
    tasks: [],
  };

  // Generate month buckets
  const monthBuckets: Record<string, {
    leads: { count: number; byIndustry: Record<string, number>; converted: number };
    revenue: { mrr: number; total: number };
    clients: { active: number; churned: number; byIndustry: Record<string, { active: number; churned: number }> };
    tasks: { completed: number; total: number };
  }> = {};

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthBuckets[monthKey] = {
      leads: { count: 0, byIndustry: {}, converted: 0 },
      revenue: { mrr: 0, total: 0 },
      clients: { active: 0, churned: 0, byIndustry: {} },
      tasks: { completed: 0, total: 0 },
    };
  }

  // Fetch Leads
  try {
    const leadsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/Leads`);
    leadsUrl.searchParams.set('filterByFormula', `IS_AFTER({Created Time}, "${startDate.toISOString().split('T')[0]}")`);
    leadsUrl.searchParams.set('maxRecords', '10000');

    const leadsResponse = await fetch(leadsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      leadsData.records?.forEach((record: any) => {
        const created = new Date(record.fields.Created || record.createdTime);
        const monthKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthBuckets[monthKey]) {
          monthBuckets[monthKey].leads.count++;
          const industry = record.fields.Industry || record.fields.Source || 'Unknown';
          monthBuckets[monthKey].leads.byIndustry[industry] = 
            (monthBuckets[monthKey].leads.byIndustry[industry] || 0) + 1;
          
          // Count conversions (leads that became clients)
          if (record.fields.Status === 'converted' || record.fields['Verification Status'] === 'verified') {
            monthBuckets[monthKey].leads.converted++;
          }
        }
      });
    }
  } catch (error) {
    console.error('[Forecast] Error fetching leads:', error);
  }

  // Fetch Clients
  try {
    const clientsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/Clients`);
    const clientsResponse = await fetch(clientsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    if (clientsResponse.ok) {
      const clientsData = await clientsResponse.json();
      clientsData.records?.forEach((record: any) => {
        const startDate = new Date(record.fields['Start Date'] || record.fields.Created || record.createdTime);
        const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthBuckets[monthKey]) {
          const billingStatus = record.fields['Billing Status'] || 'Active';
          if (billingStatus === 'Active') {
            monthBuckets[monthKey].clients.active++;
            const industry = record.fields.Industry || 'Unknown';
            if (!monthBuckets[monthKey].clients.byIndustry[industry]) {
              monthBuckets[monthKey].clients.byIndustry[industry] = { active: 0, churned: 0 };
            }
            monthBuckets[monthKey].clients.byIndustry[industry].active++;
          } else if (billingStatus === 'Cancelled' || billingStatus === 'Churned') {
            monthBuckets[monthKey].clients.churned++;
            const industry = record.fields.Industry || 'Unknown';
            if (!monthBuckets[monthKey].clients.byIndustry[industry]) {
              monthBuckets[monthKey].clients.byIndustry[industry] = { active: 0, churned: 0 };
            }
            monthBuckets[monthKey].clients.byIndustry[industry].churned++;
          }
        }
      });
    }
  } catch (error) {
    console.error('[Forecast] Error fetching clients:', error);
  }

  // Fetch Revenue (from Clients MRR)
  try {
    const clientsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/Clients`);
    const clientsResponse = await fetch(clientsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    if (clientsResponse.ok) {
      const clientsData = await clientsResponse.json();
      clientsData.records?.forEach((record: any) => {
        const startDate = new Date(record.fields['Start Date'] || record.fields.Created || record.createdTime);
        const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthBuckets[monthKey]) {
          const mrr = parseFloat(record.fields['Plan Amount'] || record.fields['Monthly Amount'] || '0');
          monthBuckets[monthKey].revenue.mrr += mrr;
          monthBuckets[monthKey].revenue.total += mrr;
        }
      });
    }
  } catch (error) {
    console.error('[Forecast] Error fetching revenue:', error);
  }

  // Fetch Tasks
  try {
    const tasksUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/InternalTasks`);
    tasksUrl.searchParams.set('filterByFormula', `IS_AFTER({Created}, "${startDate.toISOString().split('T')[0]}")`);
    tasksUrl.searchParams.set('maxRecords', '5000');

    const tasksResponse = await fetch(tasksUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    if (tasksResponse.ok) {
      const tasksData = await tasksResponse.json();
      tasksData.records?.forEach((record: any) => {
        const created = new Date(record.fields.Created || record.createdTime);
        const monthKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthBuckets[monthKey]) {
          monthBuckets[monthKey].tasks.total++;
          if (record.fields.Status === 'Done') {
            monthBuckets[monthKey].tasks.completed++;
          }
        }
      });
    }
  } catch (error) {
    console.error('[Forecast] Error fetching tasks:', error);
  }

  // Convert buckets to array format
  Object.keys(monthBuckets).sort().forEach((monthKey) => {
    const bucket = monthBuckets[monthKey];
    const [year, month] = monthKey.split('-');
    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    data.leads.push({
      month: monthName,
      count: bucket.leads.count,
      byIndustry: bucket.leads.byIndustry,
      conversionRate: bucket.leads.count > 0 ? (bucket.leads.converted / bucket.leads.count) * 100 : 0,
    });

    data.revenue.push({
      month: monthName,
      mrr: bucket.revenue.mrr,
      totalRevenue: bucket.revenue.total,
    });

    const totalClients = bucket.clients.active + bucket.clients.churned;
    data.clients.push({
      month: monthName,
      active: bucket.clients.active,
      churned: bucket.clients.churned,
      churnRate: totalClients > 0 ? (bucket.clients.churned / totalClients) * 100 : 0,
      byIndustry: bucket.clients.byIndustry,
    });

    data.tasks.push({
      month: monthName,
      completed: bucket.tasks.completed,
      total: bucket.tasks.total,
      completionRate: bucket.tasks.total > 0 ? (bucket.tasks.completed / bucket.tasks.total) * 100 : 0,
    });
  });

  return data;
}


