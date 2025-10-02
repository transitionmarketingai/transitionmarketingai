'use client';

import React, { useState, useEffect } from 'react';
import { dataService, Contact } from '@/lib/dataService';

interface ContactData extends Contact {
  closedDeals: number;
  openDeals: number;
  nextActivityDate: string;
  owner: string;
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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactData[]>(sampleContacts);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Transition Marketing');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(filterTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
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

  return (
    <div className="max-w-full mx-auto">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              + Person
            </button>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All names</option>
              <option>Recently added</option>
              <option>Have activities</option>
              <option>No activities</option>
            </select>
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
            <span className="text-sm text-gray-500">{filteredContacts.length} people</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search contacts..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
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
              {filteredContacts.map((contact) => (
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
                    <div className="text-xs text-gray-500">Work</div>
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24-24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5 19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new contact.</p>
          </div>
        )}
      </div>

      {/* Add Person Modal */}
      {showAddPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Contact</h3>
              <button
                onClick={() => setShowAddPerson(false)}
                className="text-gray-400 hover:text-gray-600"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Add Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPerson(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
