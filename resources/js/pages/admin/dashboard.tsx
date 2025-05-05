import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/layouts/AdminLayout';
import { type OrderStatus } from '@/types/order';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
  };
}

interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  salesHistory: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  recentOrders: Array<{
    id: number;
    customer: string;
    total: number;
    status: OrderStatus;
    created_at: string;
  }>;
  topProducts: Array<{
    id: number;
    name: string;
    sales: number;
    revenue: number;
  }>;
}

interface Props {
  metrics: DashboardMetrics;
}

export default function Dashboard({ metrics }: Props) {
  const { auth } = usePage<PageProps>().props;

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
    <AdminLayout user={auth.user}>
      <Head title="Admin Dashboard" />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold">
                  ${metrics.totalRevenue.toLocaleString()}
                </h3>
                <p className="text-xs text-green-600">
                  +{metrics.revenueGrowth}% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold">
                  {metrics.totalOrders.toLocaleString()}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <h3 className="text-2xl font-bold">
                  {metrics.totalCustomers.toLocaleString()}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Products
                </p>
                <h3 className="text-2xl font-bold">
                  {metrics.totalProducts.toLocaleString()}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.salesHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                      <Badge 
                        variant={getStatusVariant(order.status)}
                        className="mt-1"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.topProducts.map((product) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                    <p className="font-medium">
                      ${product.revenue.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}