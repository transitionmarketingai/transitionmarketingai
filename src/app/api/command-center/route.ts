import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';
import { getOpenAI } from '@/lib/ai/openai';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

/**
 * Business Command Center API
 * Handles conversational AI commands to query data and execute actions
 */

// Intent types
type Intent =
  | 'query_metrics'
  | 'query_client'
  | 'query_leads'
  | 'query_revenue'
  | 'query_support'
  | 'query_tasks'
  | 'action_create_task'
  | 'action_trigger_report'
  | 'action_run_forecast'
  | 'action_sales_followup'
  | 'action_update_stage'
  | 'general';

interface IntentResponse {
  intent: Intent;
  confidence: number;
  entities?: Record<string, any>;
}

/**
 * Classify user intent using OpenAI
 */
async function classifyIntent(message: string): Promise<IntentResponse> {
  const openai = getOpenAI();
  if (!openai) {
    return { intent: 'general', confidence: 0 };
  }

  const prompt = `Classify this admin command into one of these intents. Respond with ONLY valid JSON:

{
  "intent": "query_metrics" | "query_client" | "query_leads" | "query_revenue" | "query_support" | "query_tasks" | "action_create_task" | "action_trigger_report" | "action_run_forecast" | "action_sales_followup" | "action_update_stage" | "general",
  "confidence": 0.0-1.0,
  "entities": {}
}

Intent definitions:
- query_metrics: Questions about KPIs, stats, numbers (e.g., "How many leads this week?", "Show MRR")
- query_client: Questions about specific clients or client summaries (e.g., "Summarize Mumbai Realty", "Which clients are at risk?")
- query_leads: Questions about leads (e.g., "How many leads this month?", "Show top leads")
- query_revenue: Questions about revenue, payments, financials (e.g., "What did we earn?", "Revenue this month")
- query_support: Questions about support tickets (e.g., "Summarize support issues", "Open tickets today")
- query_tasks: Questions about tasks (e.g., "Show my tasks", "Tasks due today")
- action_create_task: Commands to create a task (e.g., "Create task to follow up with X", "Add task for Y")
- action_trigger_report: Commands to send/generate reports (e.g., "Send monthly reports", "Generate report now")
- action_run_forecast: Commands to run forecasting (e.g., "Run forecast", "Update forecast")
- action_sales_followup: Commands for sales follow-ups (e.g., "Follow up with client X", "Send follow-up")
- action_update_stage: Commands to update deal/lead stages
- general: Anything else or unclear

Command: "${message}"

Respond with ONLY the JSON object, no other text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an intent classifier. Respond ONLY with valid JSON, no markdown or explanatory text.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('[Command Center] Intent classification error:', error);
  }

  return { intent: 'general', confidence: 0 };
}

/**
 * Fetch metrics data
 */
async function fetchMetrics(timeframe?: string) {
  const supabase = getSupabaseServerClient();
  
  // Get date range
  const now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of month
  
  if (timeframe === 'week' || timeframe?.includes('week')) {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  } else if (timeframe === 'today' || timeframe?.includes('today')) {
    startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
  }

  // Fetch leads count
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('received_at', startDate.toISOString());

  // Fetch clients count
  const { count: clientsCount } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true });

  // Fetch active clients
  const { count: activeClientsCount } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // Fetch support tickets
  const { count: ticketsCount } = await supabase
    .from('support_tickets')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open');

  return {
    leads: leadsCount || 0,
    clients: clientsCount || 0,
    activeClients: activeClientsCount || 0,
    openTickets: ticketsCount || 0,
    timeframe: timeframe || 'month',
  };
}

/**
 * Fetch client summary
 */
async function fetchClientSummary(query: string) {
  const supabase = getSupabaseServerClient();
  
  // Try to find client by name
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .or(`business_name.ilike.%${query}%,contact_person.ilike.%${query}%`)
    .limit(10);

  if (!clients || clients.length === 0) {
    return { message: 'No clients found matching that query.' };
  }

  // Get additional data for each client
  const enrichedClients = await Promise.all(
    clients.map(async (client: any) => {
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('customer_id', client.id);

      return {
        ...client,
        leadsCount: leadsCount || 0,
      };
    })
  );

  return { clients: enrichedClients };
}

/**
 * Fetch leads data
 */
async function fetchLeads(timeframe?: string) {
  const supabase = getSupabaseServerClient();
  
  const now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  
  if (timeframe === 'week' || timeframe?.includes('week')) {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  } else if (timeframe === 'today' || timeframe?.includes('today')) {
    startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
  }

  const { data: leads, count } = await supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .gte('received_at', startDate.toISOString())
    .order('received_at', { ascending: false })
    .limit(50);

  // Group by source
  const bySource = leads?.reduce((acc: any, lead: any) => {
    const source = lead.source || 'unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return {
    total: count || 0,
    leads: leads || [],
    bySource,
    timeframe: timeframe || 'month',
  };
}

/**
 * Fetch revenue data
 */
async function fetchRevenue(timeframe?: string) {
  const supabase = getSupabaseServerClient();
  
  const now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  
  if (timeframe === 'week' || timeframe?.includes('week')) {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  } else if (timeframe === 'today' || timeframe?.includes('today')) {
    startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
  }

  // Fetch payments/invoices
  const { data: payments } = await supabase
    .from('payments')
    .select('amount, status, created_at')
    .gte('created_at', startDate.toISOString())
    .eq('status', 'success');

  const totalRevenue = payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0;

  return {
    totalRevenue,
    paymentCount: payments?.length || 0,
    timeframe: timeframe || 'month',
  };
}

/**
 * Fetch support tickets
 */
async function fetchSupportTickets(timeframe?: string) {
  const supabase = getSupabaseServerClient();
  
  const now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  
  if (timeframe === 'today' || timeframe?.includes('today')) {
    startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
  }

  const { data: tickets, count } = await supabase
    .from('support_tickets')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })
    .limit(50);

  const byStatus = tickets?.reduce((acc: any, ticket: any) => {
    const status = ticket.status || 'open';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return {
    total: count || 0,
    tickets: tickets || [],
    byStatus,
    timeframe: timeframe || 'month',
  };
}

/**
 * Fetch tasks
 */
async function fetchTasks() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const tasksTableName = process.env.AIRTABLE_TASKS_TABLE_NAME || 'InternalTasks';

  if (!airtableApiKey || !airtableBaseId) {
    return { message: 'Airtable not configured for tasks.' };
  }

  try {
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}`);
    url.searchParams.set('sort[0][field]', 'Created');
    url.searchParams.set('sort[0][direction]', 'desc');
    url.searchParams.set('maxRecords', '50');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    const tasks = data.records.map((record: any) => ({
      id: record.id,
      title: record.fields.Title || '',
      status: record.fields.Status || 'Open',
      priority: record.fields.Priority || 'Medium',
      assignedTo: record.fields['Assigned To'] || '',
      dueDate: record.fields['Due Date'] || '',
    }));

    return { tasks };
  } catch (error) {
    console.error('[Command Center] Fetch tasks error:', error);
    return { message: 'Failed to fetch tasks.', tasks: [] };
  }
}

/**
 * Create a task from message
 */
async function createTaskFromMessage(message: string) {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const tasksTableName = process.env.AIRTABLE_TASKS_TABLE_NAME || 'InternalTasks';

  if (!airtableApiKey || !airtableBaseId) {
    return { success: false, message: 'Airtable not configured for tasks.' };
  }

  // Use AI to extract task details
  const openai = getOpenAI();
  if (!openai) {
    return { success: false, message: 'OpenAI not available.' };
  }

  const extractPrompt = `Extract task details from this command. Respond with ONLY valid JSON:
{
  "title": "Task title (max 100 chars)",
  "description": "Task description",
  "priority": "High" | "Medium" | "Low",
  "assignedTo": "Name or empty string",
  "dueDate": "YYYY-MM-DD or empty string"
}

Command: "${message}"`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a task extraction assistant. Respond ONLY with valid JSON, no markdown.',
        },
        { role: 'user', content: extractPrompt },
      ],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' },
    });

    const taskData = JSON.parse(response.choices[0]?.message?.content || '{}');

    // Create task in Airtable
    const createResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Title: taskData.title || 'New Task',
            Description: taskData.description || '',
            Priority: taskData.priority || 'Medium',
            Status: 'Open',
            'Assigned To': taskData.assignedTo || '',
            'Due Date': taskData.dueDate || '',
            Created: new Date().toISOString(),
          },
        }),
      }
    );

    if (!createResponse.ok) {
      throw new Error('Failed to create task');
    }

    const created = await createResponse.json();
    return { success: true, task: created };
  } catch (error) {
    console.error('[Command Center] Create task error:', error);
    return { success: false, message: 'Failed to create task.' };
  }
}

/**
 * Trigger report generation
 */
async function triggerReports() {
  try {
    // Call monthly reports API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/monthly-reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true, message: 'Reports triggered successfully.' };
    }
    return { success: false, message: 'Failed to trigger reports.' };
  } catch (error) {
    console.error('[Command Center] Trigger reports error:', error);
    return { success: false, message: 'Error triggering reports.' };
  }
}

/**
 * Run forecast
 */
async function runForecast() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ai-forecast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true, message: 'Forecast run successfully.' };
    }
    return { success: false, message: 'Failed to run forecast.' };
  } catch (error) {
    console.error('[Command Center] Run forecast error:', error);
    return { success: false, message: 'Error running forecast.' };
  }
}

/**
 * Generate AI summary from data
 */
async function generateSummary(data: any, intent: Intent, originalMessage: string): Promise<string> {
  const openai = getOpenAI();
  if (!openai) {
    return JSON.stringify(data, null, 2);
  }

  const prompt = `You are a helpful assistant for Transition Marketing AI. The user asked: "${originalMessage}"

Here is the data retrieved:
${JSON.stringify(data, null, 2)}

Provide a clear, concise, and helpful response. Use natural language, not raw data. Include key numbers and insights. Be conversational but professional.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful business intelligence assistant. Provide clear, actionable insights.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('[Command Center] Summary generation error:', error);
    return JSON.stringify(data, null, 2);
  }
}

/**
 * Main POST handler
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { message, voiceInput } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        createErrorResponse('Message is required'),
        { status: 400 }
      );
    }

    // Track command center opened
    trackEvent('command_center_opened', {
      event_category: 'command_center',
      has_voice: !!voiceInput,
    });

    // 1. Classify intent
    const intentResult = await classifyIntent(message);
    const intent = intentResult.intent;

    // 2. Fetch data or execute action based on intent
    let result: any;
    let actionExecuted = false;

    switch (intent) {
      case 'query_metrics':
        result = await fetchMetrics(message);
        break;

      case 'query_client':
        result = await fetchClientSummary(message);
        break;

      case 'query_leads':
        result = await fetchLeads(message);
        break;

      case 'query_revenue':
        result = await fetchRevenue(message);
        break;

      case 'query_support':
        result = await fetchSupportTickets(message);
        break;

      case 'query_tasks':
        result = await fetchTasks();
        break;

      case 'action_create_task':
        result = await createTaskFromMessage(message);
        actionExecuted = true;
        break;

      case 'action_trigger_report':
        result = await triggerReports();
        actionExecuted = true;
        break;

      case 'action_run_forecast':
        result = await runForecast();
        actionExecuted = true;
        break;

      default:
        result = { message: "I'm not sure how to help with that. Try asking about metrics, clients, leads, revenue, support tickets, or tasks. Or ask me to create a task, trigger reports, or run a forecast." };
    }

    // 3. Generate AI summary
    const summary = await generateSummary(result, intent, message);

    // 4. Track analytics
    trackEvent('command_executed', {
      event_category: 'command_center',
      intent,
      action_executed: actionExecuted,
    });

    trackEvent('command_ai_summary_generated', {
      event_category: 'command_center',
      intent,
    });

    return NextResponse.json(
      createSuccessResponse({
        reply: summary,
        intent,
        rawData: result,
        actionExecuted,
      })
    );
  } catch (error: any) {
    console.error('[Command Center] Error:', error);
    
    trackEvent('command_failed', {
      event_category: 'command_center',
      error: error.message,
    });

    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

