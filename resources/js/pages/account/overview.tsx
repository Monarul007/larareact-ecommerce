import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OrderHistory from '@/components/orders/OrderHistory';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ShoppingBag, Settings, Key } from 'lucide-react';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
    orders_count: number;
    total_spent: number;
  };
  recentOrders: Array<{
    id: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    items: Array<{
      product: {
        name: string;
        image?: string;
      };
      quantity: number;
      price: number;
    }>;
  }>;
}

export default function AccountOverview({ user, recentOrders }: Props) {
  return (
    <DashboardLayout user={user}>
      <Head title="Account Overview" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Account Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here's an overview of your account.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold">
                  {user.orders_count}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Account Status
                </p>
                <h3 className="text-2xl font-bold">
                  Active
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </p>
                <h3 className="text-2xl font-bold">
                  ${user.total_spent.toFixed(2)}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions you might want to take
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" asChild>
              <Link href={route('profile.edit')}>Edit Profile</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={route('password.edit')}>Change Password</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={route('orders.index')}>View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <OrderHistory orders={recentOrders} showViewAll />
      </div>
    </DashboardLayout>
  );
}