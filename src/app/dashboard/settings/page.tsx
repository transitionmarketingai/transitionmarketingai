'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, Bell, Users, CreditCard, Plug, Save, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [profileSettings, setProfileSettings] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    gstNumber: '',
    address: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    newLeadAlerts: true,
    campaignUpdates: true,
    weeklyReports: true,
    monthlyReports: false,
  });

  useEffect(() => {
    // Load settings from localStorage (demo mode) or API
    const isDemoMode = localStorage.getItem('demo_mode') === 'true';
    
    if (isDemoMode) {
      const demoCustomer = localStorage.getItem('demo_customer');
      if (demoCustomer) {
        const customer = JSON.parse(demoCustomer);
        setProfileSettings({
          businessName: customer.business_name || 'ABC Real Estate',
          contactPerson: customer.contact_person || 'Demo User',
          email: 'demo@example.com',
          phone: '+91 98765 43210',
          gstNumber: '',
          address: '',
        });
      }
    } else {
      // Load from onboarding data or API
      const onboardingData = localStorage.getItem('onboarding_data');
      if (onboardingData) {
        const data = JSON.parse(onboardingData);
        setProfileSettings(prev => ({
          ...prev,
          businessName: data.businessName || '',
          contactPerson: data.contactPerson || '',
        }));
      }
    }

    // Load notification settings from localStorage
    const savedNotifications = localStorage.getItem('notification_settings');
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    
    try {
      // TODO: Send to API endpoint
      // For now, save to localStorage
      localStorage.setItem('profile_settings', JSON.stringify(profileSettings));
      
      // Update demo customer if in demo mode
      const isDemoMode = localStorage.getItem('demo_mode') === 'true';
      if (isDemoMode) {
        const demoCustomer = localStorage.getItem('demo_customer');
        if (demoCustomer) {
          const customer = JSON.parse(demoCustomer);
          customer.business_name = profileSettings.businessName;
          customer.contact_person = profileSettings.contactPerson;
          localStorage.setItem('demo_customer', JSON.stringify(customer));
        }
      }
      
      toast.success('Profile settings saved successfully');
    } catch (error) {
      toast.error('Failed to save profile settings');
    } finally {
      setLoading(false);
    }
  };

  const saveNotifications = async () => {
    setLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('notification_settings', JSON.stringify(notificationSettings));
      
      // TODO: Send to API endpoint
      
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update notification preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Plug className="h-4 w-4" />
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
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={profileSettings.contactPerson}
                    onChange={(e) => setProfileSettings({ ...profileSettings, contactPerson: e.target.value })}
                    placeholder="Enter contact person name"
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
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                    placeholder="+91 98765 43210"
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

              <Button 
                onClick={saveProfile} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
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
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Email Notifications</div>
                    <div className="text-sm text-slate-500">Receive updates via email</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">WhatsApp Notifications</div>
                    <div className="text-sm text-slate-500">Instant alerts on WhatsApp</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.whatsappNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, whatsappNotifications: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">New Lead Alerts</div>
                    <div className="text-sm text-slate-500">Get notified for every new lead</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.newLeadAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, newLeadAlerts: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Campaign Updates</div>
                    <div className="text-sm text-slate-500">Performance and budget alerts</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.campaignUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, campaignUpdates: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Weekly Reports</div>
                    <div className="text-sm text-slate-500">Weekly summary of your leads and campaigns</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Monthly Reports</div>
                    <div className="text-sm text-slate-500">Detailed monthly analytics report</div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.monthlyReports}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, monthlyReports: checked as boolean })
                    }
                  />
                </div>
              </div>

              <Button 
                onClick={saveNotifications} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs - coming soon */}
        <TabsContent value="team">
          <Card>
            <CardContent className="py-16 text-center text-slate-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Team Management</h3>
              <p className="text-sm">Invite team members and manage permissions</p>
              <p className="text-sm mt-4 text-slate-400">Coming soon...</p>
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
                    <div className="text-2xl font-bold text-slate-900">Free Trial</div>
                    <div className="text-sm text-slate-600">14 days remaining • Growth plan access</div>
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
                    <span className="font-medium text-slate-900">AI Search Contacts</span>
                    <span className="text-slate-600">23 / 100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">77 searches remaining this month</p>
                </div>

                {/* Email Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">Email Outreach</span>
                    <span className="text-slate-600">156 / 500</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">344 emails remaining this month</p>
                </div>

                {/* WhatsApp Usage */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">WhatsApp Messages</span>
                    <span className="text-slate-600">89 / 500</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">411 messages remaining this month</p>
                </div>

                <div className="border-t border-slate-200 pt-4 mt-4">
                  <p className="text-sm text-slate-600">
                    Usage resets on the 1st of each month. Need more? <a href="/pricing" className="text-blue-600 hover:underline font-medium">Upgrade your plan</a>
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
                <div className="text-center py-8 text-slate-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p className="mb-2 font-medium text-slate-900">No payment method on file</p>
                  <p className="text-sm mb-4">Add a payment method before your trial ends to continue using the platform.</p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardContent className="py-16 text-center text-slate-500">
              <Plug className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Integrations</h3>
              <p className="text-sm">Connect with your favorite tools and platforms</p>
              <p className="text-sm mt-4 text-slate-400">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
