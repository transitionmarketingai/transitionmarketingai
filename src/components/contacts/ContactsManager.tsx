'use client'

import React, { useState, useEffect } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  company: string
  position: string
  phone?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'customer'
  tags: string[]
  lastActivity: string
  score: number
}

export default function ContactsManager() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'qualified' | 'customers'>('all')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    // Initialize with sample contacts
    setContacts([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        company: 'TechCorp Solutions',
        position: 'VP of Marketing',
        phone: '+1-555-0123',
        source: 'LinkedIn',
        status: 'qualified',
        tags: ['Enterprise', 'SaaS', 'High-Value'],
        lastActivity: '2024-03-15T10:30:00Z',
        score: 87
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'm.chen@startupxyz.io',
        company: 'StartupXYZ',
        position: 'Founder & CEO',
        phone: '+1-555-0456',
        source: 'Cold Email',
        status: 'customer',
        tags: ['Startup', 'Tech', 'Premium'],
        lastActivity: '2024-03-14T14:22:00Z',
        score: 95
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily@growthmkting.com',
        company: 'Growth Marketing Inc',
        position: 'Marketing Director',
        phone: '+1-555-0789',
        source: 'Referral',
        status: 'contacted',
        tags: ['Marketing', 'Agency', 'Potential'],
        lastActivity: '2024-03-12T09:15:00Z',
        score: 72
      },
      {
        id: '4',
        name: 'David Park',
        email: 'david.park@enterprisebiz.com',
        company: 'Enterprise Business Solutions',
        position: 'CTO',
        phone: '+1-555-0321',
        source: 'AI Lead Generation',
        status: 'new',
        tags: ['Enterprise', 'Tech', 'Lead Score 85'],
        lastActivity: '2024-03-10T16:45:00Z',
        score: 85
      }
    ])
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = activeTab === 'all' || contact.status === activeTab
    
    return matchesSearch && matchesTab
  })

  const renderContactsList = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
          <p className="text-sm text-gray-600">{filteredContacts.length} contacts found</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Contact
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    contact.status === 'qualified' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        contact.score >= 80 ? 'bg-green-500' :
                        contact.score >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${contact.score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">{contact.score}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(contact.lastActivity).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="text-blue-600 hover:text-blue-700 mr-3"
                  >
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStatsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-700">Total Contacts</span>
          <span className="text-blue-600">👥</span>
        </div>
        <div className="text-2xl font-bold text-blue-900">{contacts.length}</div>
        <div className="text-xs text-blue-600 mt-1">Active database</div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-700">Customers</span>
          <span className="text-green-600">🎯</span>
        </div>
        <div className="text-2xl font-bold text-green-900">
          {contacts.filter(c => c.status === 'customer').length}
        </div>
        <div className="text-xs text-green-600 mt-1">Converted</div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-purple-700">Qualified</span>
          <span className="text-purple-600">⭐</span>
        </div>
        <div className="text-2xl font-bold text-purple-900">
          {contacts.filter(c => c.status === 'qualified').length}
        </div>
        <div className="text-xs text-purple-600 mt-1">High potential</div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-orange-700">Avg. Score</span>
          <span className="text-orange-600">📊</span>
        </div>
        <div className="text-2xl font-bold text-orange-900">
          {Math.round(contacts.reduce((sum, c) => sum + c.score, 0) / contacts.length)}
        </div>
        <div className="text-xs text-orange-600 mt-1">Lead quality</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacts Management</h3>
            <p className="text-gray-600">Manage your contact database and relationships</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'all' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'new' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          New ({contacts.filter(c => c.status === 'new').length})
        </button>
        <button
          onClick={() => setActiveTab('qualified')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'qualified' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Qualified ({contacts.filter(c => c.status === 'qualified').length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'customers' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Customers ({contacts.filter(c => c.status === 'customer').length})
        </button>
      </div>

      {/* Stats Overview */}
      {renderStatsOverview()}

      {/* Contacts List */}
      {renderContactsList()}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {selectedContact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h4>
                  <p className="text-gray-600">{selectedContact.position}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Email</label>
                <div className="font-medium">{selectedContact.email}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Phone</label>
                <div className="font-medium">{selectedContact.phone || 'Not provided'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Company</label>
                <div className="font-medium">{selectedContact.company}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Source</label>
                <div className="font-medium">{selectedContact.source}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Status</label>
                <div className="font-medium">{selectedContact.status}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Lead Score</label>
                <div className="font-medium">{selectedContact.score}/100</div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {selectedContact.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
