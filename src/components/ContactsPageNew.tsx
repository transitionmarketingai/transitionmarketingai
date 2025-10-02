'use client';

import React, { useState, useEffect } from 'react';
import { dataService, Contact } from '@/lib/dataService';

interface ContactData extends Contact {
  closedDeals: number;
  openDeals: number;
  nextActivityDate: string;
  owner: string;
}

interface OrganizationData {
  id: string;
  name: string;
  address?: string;
  people: number;
  closedDeals: number;
  openDeals: number;
  nextActivityDate: string;
  owner: string;
  createdAt: string;
}

const sampleContacts: ContactData[] = [
  {
    id: '1',
    name: 'Benjamin Leon',
    company: '[Sample] Leon Digital Systems',
    email: 'benjamin.leon@gmail.com',
    phone: '785-202-7824',
    status: 'Lead',
    dealValue: 0,
    lastContact: '2024-10-01',
    userId: 'demo-user',
    closedDeals: 0,
    openDeals: 1,
    nextActivityDate: 'October 2, 2025',
    owner: 'Transition Marketing',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tony Turner',
    company: '[Sample] MoveEr Tech Group',
    email: 'tony.turner@moveer.com',
    phone: '218-348-8528',
    status: 'Lead',
    dealValue: 0,
    lastContact: '2024-10-25',
    userId: 'demo-user',
    closedDeals: 0,
    openDeals: 1,
    nextActivityDate: 'October 4, 2025',
    owner: 'Transition Marketing',
    createdAt: new Date().toISOString()
  }
];

const sampleOrganizations: OrganizationData[] = [
  {
    id: '1',
    name: '[Sample] MoveEr Tech Group',
    address: '',
    people: 1,
    closedDeals: 1,
    openDeals: 0,
    nextActivityDate: 'October 4, 2025',
    owner: 'Transition Marketing',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: '[Sample] Leon Digital Systems',
    address: '',
    people: 1,
    closedDeals: 1,
    openDeals: 0,
    nextActivityDate: 'October 2, 2025',
    owner: 'Transition Marketing',
    createdAt: new Date().toISOString()
  }
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactData[]>(sampleContacts);
  const [organizations, setOrganizations] = useState<OrganizationData[]>(sampleOrganizations);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showAddOrganization, setShowAddOrganization] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Transition Marketing');
  const [activeTab, setActiveTab] = useState<'people' | 'organizations'>('people');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(filterTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    (org.address && org.address.toLowerCase().includes(filterTerm.toLowerCase()))
  );

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectOrganization = (organizationId: string) => {
    setSelectedOrganizations(prev =>
      prev.includes(organizationId)
        ? prev.filter(id => id !== organizationId)
        : [...prev, organizationId]
    );
  };

  const handleSelectAll = () => {
    if (activeTab === 'people') {
      if (selectedContacts.length === filteredContacts.length) {
        setSelectedContacts([]);
      } else {
        setSelectedContacts(filteredContacts.map(c => c.id));
      }
    } else {
      if (selectedOrganizations.length === filteredOrganizations.length) {
        setSelectedOrganizations([]);
      } else {
        setSelectedOrganizations(filteredOrganizations.map(o => o.id));
      }
    }
  };

  const handleAddContact = async (contactData: {
    name: string;
    organization: string;
    email: string;
    phone: string;
    status: Contact['status'];
  }) => {
    const newContact: ContactData = {
      name: contactData.name,
      company: contactData.organization,
      email: contactData.email,
      phone: contactData.phone,
      status: contactData.status,
      dealValue: 0,
      lastContact: new Date().toISOString().split('T')[0],
      userId: 'demo-user',
      id: Date.now().toString(),
      closedDeals: 0,
      openDeals: 0,
      nextActivityDate: 'No upcoming activity',
      owner: 'Transition Marketing',
      createdAt: new Date().toISOString()
    };
    
    await dataService.addContact({
      name: contactData.name,
      company: contactData.organization,
      email: contactData.email,
      phone: contactData.phone,
      status: contactData.status,
      dealValue: 0,
      lastContact: new Date().toISOString().split('T')[0]
    });
    setContacts([...contacts, newContact]);
    setShowAddPerson(false);
  };

  const handleAddOrganization = async (orgData: {
    name: string;
    address?: string;
  }) => {
    const newOrganization: OrganizationData = {
      ...orgData,
      id: Date.now().toString(),
      people: 0,
      closedDeals: 0,
      openDeals: 0,
      nextActivityDate: ' No upcoming activity',
      owner: 'Transition Marketing',
      createdAt: new Date().toISOString()
    };
    
    setOrganizations([...organizations, newOrganization]);
    setShowAddOrganization(false);
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        {/* Tab Navigation */}
        <div className="flex items-center space-x-8 mb-4">
          <div className="flex space-x-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('people')}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'people'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              People
            </button>
            <button
              onClick={() => setActiveTab('organizations')}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'organizations'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Organizations
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {activeTab === 'people' ? (
              <button
                onClick={() => setShowAddPerson(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                + Person
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowAddOrganization(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l19-7l-19-7l-19 7l19 7z"></path>
                  </svg>
                  + Organization
                </button>
                <svg className="w-4 h-4 ml absolute top-0 right-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            )}
            
            <button className="text-gray-500 hover:text-gray-700 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004-582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm flex items-center"
              >
                {activeFilter}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
            <span className="text-sm text-gray-500">
              {activeTab === 'people' 
                ? `${filteredContacts.length} people` 
                : `${filteredOrganizations.length} organizations`
              }
            </span>
            
            <button className="text-gray-400 hover:text-gray-600 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder={activeTab === 'people' ? 'Search contacts...' : 'Search organizations...'}
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={activeTab === 'people' 
                      ? selectedContacts.length === filteredContacts.length && filteredContacts.length > 0
                      : selectedOrganizations.length === filteredOrganizations.length && filteredOrganizations.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[blue-600] focus:ring-blue-500"
                  />
                </th>
                
                {/* Table Headers */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {activeTab === 'people' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                  </>
                ) : (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                )}
                {activeTab === 'people' ? null : (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    People
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Closed deals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open deals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next activity date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeTab === 'people' ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.email}</div>
                      <div className="text-xs text-[gray]-500">Work</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-blue-600 underline">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {contact.closedDeals}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {contact.openDeals}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.nextActivityDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5 19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                filteredOrganizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrganizations.includes(org.id)}
                        onChange={() => handleSelectOrganization(org.id)}
                        className="rounded border-gray-300 text-[blue-600] focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{org.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{org.address || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {org.people}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {org.closedDeals}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {org.openDeals}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {org.nextActivityDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {org.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-[gray]-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                        </button>
                        <button className="text-[gray]-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5-19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {((activeTab === 'people' && filteredContacts.length === 0) || 
          (activeTab === 'organizations' && filteredOrganizations.length === 0)) && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[gray]-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-[gray]-900">
              No {activeTab === 'people' ? 'contacts' : 'organizations'}
            </h3>
            <p className="mt-1 text-sm text-[gray]-500">
              Get started by creating a new {activeTab === 'people' ? 'contact' : 'organization'}.
            </p>
          </div>
        )}
      </div>

      {/* Add Person Modal */}
      {showAddPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[gray]-900">Add New Contact</h3>
              <button
                onClick={() => setShowAddPerson(false)}
                className="text-[gray]-400 hover:text-[gray]-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddContact({
                name: formData.get('name') as string,
                organization: formData.get('organization') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                status: 'Lead'
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[gray]-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p x-3 py-2 border border-[gray]-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[blue]-500"
                  placeholder="Contact name"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
