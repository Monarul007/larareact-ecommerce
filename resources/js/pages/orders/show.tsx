import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrderTracking from '@/components/orders/OrderTracking';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface OrderItem {
  id: number;
  product: {
    name: string;
    image?: string;
    slug: string;
  };
  variation: {
    attributes: Record<string, string>;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total: number;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  billing_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  items: OrderItem[];
  tracking: {
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    estimated_delivery?: string;
    tracking_number?: string;
    carrier?: string;
    updates: Array<{
      status: string;
      message: string;
      timestamp: string;
      location?: string;
    }>;
  };
  created_at: string;
}

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  order: Order;
}

export default function OrderShow({ user, order }: Props) {
  return (
    <DashboardLayout user={user}>
      <Head title={`Order #${order.id}`} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href={route('orders.index')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Order Items and Summary */}
          <div className="lg:col-span-8 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 last:pb-0 border-b last:border-0"
                    >
                      <Link
                        href={route('products.show', item.product.slug)}
                        className="shrink-0"
                      >
                        <img
                          src={item.product.image || '/placeholder.png'}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={route('products.show', item.product.slug)}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {Object.entries(item.variation.attributes).length > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {Object.entries(item.variation.attributes)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-4">
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Tracking */}
            <OrderTracking orderStatus={order.tracking} />
          </div>

          {/* Order Summary and Addresses */}
          <div className="lg:col-span-4 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping_cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.shipping_address.full_name}</p>
                  <p className="text-sm">{order.shipping_address.address_line1}</p>
                  {order.shipping_address.address_line2 && (
                    <p className="text-sm">{order.shipping_address.address_line2}</p>
                  )}
                  <p className="text-sm">
                    {order.shipping_address.city}, {order.shipping_address.state}{' '}
                    {order.shipping_address.postal_code}
                  </p>
                  <p className="text-sm">{order.shipping_address.country}</p>
                  {order.shipping_address.phone && (
                    <p className="text-sm">{order.shipping_address.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.billing_address.full_name}</p>
                  <p className="text-sm">{order.billing_address.address_line1}</p>
                  {order.billing_address.address_line2 && (
                    <p className="text-sm">{order.billing_address.address_line2}</p>
                  )}
                  <p className="text-sm">
                    {order.billing_address.city}, {order.billing_address.state}{' '}
                    {order.billing_address.postal_code}
                  </p>
                  <p className="text-sm">{order.billing_address.country}</p>
                  {order.billing_address.phone && (
                    <p className="text-sm">{order.billing_address.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}