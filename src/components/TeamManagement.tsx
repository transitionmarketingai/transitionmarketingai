'use client';

import React, { useState, useEffect } from 'react';
import { teamService, Team, TeamMember, Subscription } from '@/lib/teamService';
import { PLANS } from '@/lib/razorpay';

interface TeamManagementProps {
  activeTeam?: Team;
}

export default function TeamManagement({ activeTeam }: TeamManagementProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'subscription' | 'usage'>('overview');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'sales_rep' | 'manager' | 'admin'>('sales_rep');
  const [canManageMembers, setCanManageMembers] = useState(false);
  const [canManageSubscription, setCanManageSubscription] = useState(false);

  useEffect(() => {
    if (activeTeam) {
      loadTeamData();
    }
  }, [activeTeam]);

  const loadTeamData = async () => {
    if (!activeTeam) return;
    
    try {
      setLoading(true);
      
      // Load team members
      const members = await teamService.getTeamMembers(activeTeam.id);
      setTeamMembers(members);
      
      // Load subscription
      const sub = await teamService.getSubscription(activeTeam.id);
      setSubscription(sub);
      
      // Check permissions
      const canManage = await teamService.canPerformAction(activeTeam.id, 'manage_members');
      const canSubscribed = await teamService.canPerformAction(activeTeam.id, 'manage_subscription');
      setCanManageMembers(canManage);
      setCanManageSubscription(canSubscribed);
      
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async () => {
    if (!activeTeam || !inviteEmail) return;
    
    try {
      await teamService.inviteTeamMember(activeTeam.id, inviteEmail, inviteRole);
      setInviteEmail('');
      alert('Invitation sent successfully!');
      loadTeamData(); // Refresh data
    } catch (error) {
      console.error('Error inviting member:', error);
      alert('Failed to send invitation');
    }
  };

  const handleRemoveMember = async (memberUserId: string) => {
    if (!activeTeam || !confirm('Are you sure you want to remove this member?')) return;
    
    try {
      await teamService.removeTeamMember(activeTeam.id, memberUserId);
      alert('Member removed successfully');
      loadTeamData(); // Refresh data
    } catch (error) {
      console.error('Error removing member:', error);
      alert('Failed to remove member');
    }
  };

  const handlePayment = async (planId: 'starter' | 'growth' | 'pro') => {
    if (!activeTeam) return;
    
    try {
      const orderData = await teamService.createPaymentOrder(activeTeam.id, planId);
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        order_id: orderData.orderId,
        handler: (response: any) => {
          console.log('Payment successful:', response);
          alert('Payment successful! Your subscription has been activated.');
          loadTeamData(); // Refresh subscription data
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
          }
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const razorpay = (window as any).Razorpay;
      const paymentObject = new razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!activeTeam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Management</h1>
          <p className="text-gray-600">Select a team to manage settings and members.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{activeTeam.name}</h1>
        <p className="text-gray-600 mt-2">Manage your team settings, members, and subscription</p>
      </div>

      {/* Subscription Status */}
      <div className="mb-8">
        <div className={`p-6 rounded-lg border ${activeTeam.subscriptionStatus === 'active' ? 'bg-green-50 border-green-200' : activeTeam.subscriptionStatus === 'trial' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {PLANS[activeTeam.planId].name} Plan - {activeTeam.subscriptionStatus.toUpperCase()}
              </h3>
              <p className="text-gray-600 mt-1">
                {activeTeam.subscriptionStatus === 'trial' ? 'Free trial expires in 14 days' : `Renews on ${new Date(activeTeam.planExpiresAt).toLocaleDateString()}`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{PLANS[activeTeam.planId].price.toLocaleString()}</div>
              <div className="text-gray-600">per month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tasks */}
      <div className="mb-6 lg:mb-8">
        <nav className="flex flex-wrap gap-2 lg:gap-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊', short: 'Overview' },
            { id: 'members', label: 'Team Members', icon: '👥', short: 'Members' },
            { id: 'subscription', label: 'Subscription', icon: '💳', short: 'Billing' },
            { id: 'usage', label: 'Usage', icon: '📈', short: 'Usage' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">₹{PLANS[activeTeam.planId].price.toLocaleString()}</div>
                <div className="text-gray-600">Monthly Plan</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{activeTeam.subscriptionStatus}</div>
                <div className="text-gray-600">Status</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">0/{PLANS[activeTeam.planId].features[0].match(/\d+/)?.[0] || '200'}</div>
                <div className="text-gray-600">Leads Used</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Team created on {new Date(activeTeam.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">{activeTeam.planId.charAt(0).toUpperCase() + activeTeam.planId.slice(1)} plan activated</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Invite Member */}
            {canManageMembers && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Team Member</h3>
                <div className="flex space-x-4">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sales_rep">Sales Rep</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={handleInviteMember}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Send Invite
                  </button>
                </div>
              </div>
            )}

            {/* Team Members List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <div key={member.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {member.user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.user?.name || 'Unknown User'}</div>
                        <div className="text-gray-600">{member.user?.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'admin' ? 'bg-red-100 text-red-800' :
                        member.role === 'manager' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {member.role.replace('_', ' ').toUpperCase()}
                      </span>
                      {canManageMembers && member.role !== 'owner' && (
                        <button
                          onClick={() => handleRemoveMember(member.userId)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-6">
            {canManageSubscription ? (
              <>
                {/* Current Plan */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{PLANS[activeTeam.planId].name}</h4>
                      <p className="text-gray-600">{PLANS[activeTeam.planId].description}</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900">₹{PLANS[activeTeam.planId].price.toLocaleString()}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                    </div>
                    {activeTeam.subscriptionStatus === 'trial' && (
                      <div className="text-right">
                        <div className="text-red-600 font-semibold">Trial Expires in 10 days</div>
                        <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                          Upgrade Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Plans */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {Object.entries(PLANS).map(([planId, plan]) => (
                    <div key={planId} className={`bg-white p-6 rounded-lg border shadow-sm ${
                      planId === activeTeam.planId ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}>
                      <div className="mb-4">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-sm lg:text-base text-gray-600 mb-2">{plan.description}</p>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-900">₹{plan.price.toLocaleString()}</div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {planId !== activeTeam.planId && (
                        <button
                          onClick={() => handlePayment(planId as any)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          Subscribe to {plan.name}
                        </button>
                      )}
                      
                      {planId === activeTeam.planId && (
                        <div className="w-full bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-center">
                          Current Plan
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-gray-600">You don't have permission to manage subscription. Contact your team owner.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            {/* Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600">0</div>
                <div className="text-gray-600">Leads Generated</div>
                <div className="text-sm text-gray-500">This month</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-gray-600">Content Created</div>
                <div className="text-sm text-gray-500">This month</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600">0</div>
                <div className="text-gray-600">Emails Sent</div>
                <div className="text-sm text-gray-500">This month</div>
              </div>
            </div>

            {/* Usage Chart Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Usage charts will be available here</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
