import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Clock, ArrowRight } from 'lucide-react';
import { type OrderStatus } from '@/types/order';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import DashboardLayout from '@/layouts/DashboardLayout';

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
  };
}

interface Order {
  id: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  items: Array<{
    product: {
      name: string;
      image?: string;
    };
  }>;
}

interface Props {
  recentOrders: Order[];
  stats: {
    totalOrders: number;
    pendingDeliveries: number;
    recentPurchases: number;
  };
}

export default function Dashboard({ recentOrders, stats }: Props) {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

  const getStatusVariant = (status: OrderStatus): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
    }
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Dashboard" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalOrders}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Deliveries
                  </p>
                  <h3 className="text-2xl font-bold">
                    {stats.pendingDeliveries}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Recent Purchases
                  </p>
                  <h3 className="text-2xl font-bold">
                    {stats.recentPurchases}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href={route('orders.index')} className="flex items-center gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    You haven't placed any orders yet.
                  </p>
                  <Button asChild className="mt-4">
                    <a href={route('products.index')}>Start Shopping</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-start justify-between border-b last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex gap-4">
                        {/* Order first item image */}
                        {order.items[0] && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                              src={order.items[0].product.image || '/placeholder.png'}
                              alt={order.items[0].product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          {order.items.length > 1 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              +{order.items.length - 1} more items
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${order.total.toFixed(2)}
                        </p>
                        <Badge 
                          variant={getStatusVariant(order.status)}
                          className="mt-1"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
