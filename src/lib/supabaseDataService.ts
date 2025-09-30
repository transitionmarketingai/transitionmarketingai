import { supabase, supabaseAdmin } from './supabase'

// Types
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  source: string
  score: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Content {
  id: string
  title: string
  type: 'blog' | 'social' | 'email' | 'ad' | 'landing'
  status: 'draft' | 'review' | 'published' | 'archived'
  performance: {
    views: number
    clicks: number
    conversions: number
    engagement: number
  }
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  name: string
  type: 'email' | 'social' | 'paid' | 'content'
  status: 'draft' | 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  performance: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpc: number
    roas: number
  }
  created_at: string
  updated_at: string
}

export interface Analytics {
  totalLeads: number
  newLeads: number
  conversionRate: number
  revenue: number
  topSources: Array<{ source: string; count: number }>
  recentActivity: Array<{ type: string; description: string; timestamp: string }>
}

// Lead functions
export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data || []
}

export async function addLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single()

  if (error) {
    console.error('Error adding lead:', error)
    return null
  }

  return data
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating lead:', error)
    return null
  }

  return data
}

export async function deleteLead(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting lead:', error)
    return false
  }

  return true
}

// Content functions
export async function getContent(): Promise<Content[]> {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching content:', error)
    return []
  }

  return data || []
}

export async function addContent(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>): Promise<Content | null> {
  const { data, error } = await supabase
    .from('content')
    .insert([content])
    .select()
    .single()

  if (error) {
    console.error('Error adding content:', error)
    return null
  }

  return data
}

export async function updateContent(id: string, updates: Partial<Content>): Promise<Content | null> {
  const { data, error } = await supabase
    .from('content')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating content:', error)
    return null
  }

  return data
}

// Campaign functions
export async function getCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }

  return data || []
}

// Analytics functions
export async function getAnalytics(): Promise<Analytics> {
  // Get total leads
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  // Get new leads (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: newLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())

  // Get conversion rate
  const { count: convertedLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'converted')

  const conversionRate = totalLeads ? (convertedLeads || 0) / totalLeads * 100 : 0

  // Get top sources
  const { data: sourcesData } = await supabase
    .from('leads')
    .select('source')
  
  const sourceCounts = sourcesData?.reduce((acc: Record<string, number>, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1
    return acc
  }, {}) || {}

  const topSources = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Mock recent activity
  const recentActivity = [
    { type: 'lead', description: 'New lead from website', timestamp: new Date().toISOString() },
    { type: 'content', description: 'Blog post published', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { type: 'campaign', description: 'Email campaign sent', timestamp: new Date(Date.now() - 7200000).toISOString() }
  ]

  return {
    totalLeads: totalLeads || 0,
    newLeads: newLeads || 0,
    conversionRate: Math.round(conversionRate * 100) / 100,
    revenue: 0, // Will be calculated from actual data
    topSources,
    recentActivity
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create leads table
    const { error: leadsError } = await supabaseAdmin.rpc('create_leads_table')
    if (leadsError && !leadsError.message.includes('already exists')) {
      console.error('Error creating leads table:', leadsError)
    }

    // Create content table
    const { error: contentError } = await supabaseAdmin.rpc('create_content_table')
    if (contentError && !contentError.message.includes('already exists')) {
      console.error('Error creating content table:', contentError)
    }

    // Create campaigns table
    const { error: campaignsError } = await supabaseAdmin.rpc('create_campaigns_table')
    if (campaignsError && !campaignsError.message.includes('already exists')) {
      console.error('Error creating campaigns table:', campaignsError)
    }

    console.log('Database initialization completed')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}
