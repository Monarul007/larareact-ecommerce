import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
// import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { router } from '@inertiajs/react';

// interface NotificationSetting {
//   key: string;
//   enabled: boolean;
// }

interface Props {
  settings: {
    order_updates: boolean;
    shipping_updates: boolean;
    promotional_emails: boolean;
    newsletter: boolean;
    security_alerts: boolean;
    product_reviews: boolean;
  };
}

export default function NotificationPreferences({ settings }: Props) {
  const { toast } = useToast();
  const [preferences, setPreferences] = React.useState(settings);

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    router.put(route('settings.notifications'), { [key]: value }, {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Preferences Updated',
          description: 'Your notification preferences have been saved.',
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what kind of notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Related */}
        <div className="space-y-4">
          <h3 className="font-medium">Orders & Shipping</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="order_updates" className="flex flex-col space-y-1">
                <span>Order Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications about your order status
                </span>
              </Label>
              <Switch
                id="order_updates"
                checked={preferences.order_updates}
                onCheckedChange={(checked) => updatePreference('order_updates', checked)}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="shipping_updates" className="flex flex-col space-y-1">
                <span>Shipping Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get notified about shipping and delivery status
                </span>
              </Label>
              <Switch
                id="shipping_updates"
                checked={preferences.shipping_updates}
                onCheckedChange={(checked) => updatePreference('shipping_updates', checked)}
              />
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="space-y-4">
          <h3 className="font-medium">Marketing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="promotional_emails" className="flex flex-col space-y-1">
                <span>Promotional Emails</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive emails about sales and special offers
                </span>
              </Label>
              <Switch
                id="promotional_emails"
                checked={preferences.promotional_emails}
                onCheckedChange={(checked) => updatePreference('promotional_emails', checked)}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                <span>Newsletter</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get our weekly newsletter with news and updates
                </span>
              </Label>
              <Switch
                id="newsletter"
                checked={preferences.newsletter}
                onCheckedChange={(checked) => updatePreference('newsletter', checked)}
              />
            </div>
          </div>
        </div>

        {/* Account & Security */}
        <div className="space-y-4">
          <h3 className="font-medium">Account & Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="security_alerts" className="flex flex-col space-y-1">
                <span>Security Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get notified about important security updates
                </span>
              </Label>
              <Switch
                id="security_alerts"
                checked={preferences.security_alerts}
                onCheckedChange={(checked) => updatePreference('security_alerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="product_reviews" className="flex flex-col space-y-1">
                <span>Product Reviews</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Reminders to review products you've purchased
                </span>
              </Label>
              <Switch
                id="product_reviews"
                checked={preferences.product_reviews}
                onCheckedChange={(checked) => updatePreference('product_reviews', checked)}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            You can unsubscribe from these notifications at any time. For more information about how we handle your data,
            please see our privacy policy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}