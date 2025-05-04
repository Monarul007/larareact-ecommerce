import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import NotificationPreferences from '@/components/settings/NotificationPreferences';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  notification_settings: {
    order_updates: boolean;
    shipping_updates: boolean;
    promotional_emails: boolean;
    newsletter: boolean;
    security_alerts: boolean;
    product_reviews: boolean;
  };
}

export default function Notifications({ user, notification_settings }: Props) {
  return (
    <DashboardLayout user={user}>
      <Head title="Notification Settings" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-muted-foreground">
            Manage your email notification preferences
          </p>
        </div>

        <NotificationPreferences settings={notification_settings} />
      </div>
    </DashboardLayout>
  );
}