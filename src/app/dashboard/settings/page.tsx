'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, Building2, Bell, Users, CreditCard, Plug } from 'lucide-react';

export default function SettingsPage() {
  const [profileSettings, setProfileSettings] = useState({
    businessName: 'ABC Real Estate',
    contactPerson: 'Demo User',
    email: 'demo@example.com',
    phone: '+91 98765 43210',
    gstNumber: '',
    address: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    newLeadAlerts: true,
    campaignUpdates: true,
  });

  const saveProfile = () => {
    toast.success('Profile settings saved');
  };

  const saveNotifications = () => {
    toast.success('Notification preferences updated');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Update your business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={profileSettings.businessName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={profileSettings.contactPerson}
                    onChange={(e) => setProfileSettings({ ...profileSettings, contactPerson: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input
                  id="gstNumber"
                  value={profileSettings.gstNumber}
                  onChange={(e) => setProfileSettings({ ...profileSettings, gstNumber: e.target.value })}
                  placeholder="Enter GST number"
                />
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={profileSettings.address}
                  onChange={(e) => setProfileSettings({ ...profileSettings, address: e.target.value })}
                  placeholder="Enter business address"
                />
              </div>

              <Button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-500">Receive updates via email</div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">WhatsApp Notifications</div>
                  <div className="text-sm text-gray-500">Instant alerts on WhatsApp</div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.whatsappNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, whatsappNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">New Lead Alerts</div>
                  <div className="text-sm text-gray-500">Get notified for every new lead</div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.newLeadAlerts}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, newLeadAlerts: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Campaign Updates</div>
                  <div className="text-sm text-gray-500">Performance and budget alerts</div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.campaignUpdates}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, campaignUpdates: e.target.checked })}
                  className="rounded"
                />
              </div>

              <Button onClick={saveNotifications} className="bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs - coming soon */}
        <TabsContent value="team">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Team management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">Free Trial</div>
                    <div className="text-sm text-gray-600">14 days remaining • Growth plan access</div>
                  </div>
                  <a href="/dashboard/upgrade">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Upgrade Plan
                    </Button>
                  </a>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    🎉 You're on a free trial with full Growth plan features. No credit card required!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage This Month */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Search Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">AI Search Contacts</span>
                    <span className="text-gray-600">23 / 100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">77 searches remaining this month</p>
                </div>

                {/* Email Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Email Outreach</span>
                    <span className="text-gray-600">156 / 500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">344 emails remaining this month</p>
                </div>

                {/* WhatsApp Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">WhatsApp Messages</span>
                    <span className="text-gray-600">89 / 500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">411 messages remaining this month</p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600">
                    Usage resets on the 1st of each month. Need more? <a href="/pricing" className="text-blue-600 hover:underline">Upgrade your plan</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="mb-4">No payment method on file</p>
                  <p className="text-sm mb-4">Add a payment method before your trial ends to continue using the platform.</p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Plug className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Integrations coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

