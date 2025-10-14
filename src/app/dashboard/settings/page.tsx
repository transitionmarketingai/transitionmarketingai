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
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Billing settings coming soon</p>
            </CardContent>
          </Card>
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

