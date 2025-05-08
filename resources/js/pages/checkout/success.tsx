import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

interface Props {
  order: {
    id: number;
    total_amount: number;
    created_at: string;
  };
}

export default function Success({ order }: Props) {
  console.log(order);
  const { user } = usePage().props.auth;
  return (
    <DashboardLayout user={user}>
      <Head title="Order Successful" />
      
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card className="p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your order #{order.id} has been successfully placed.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg">
              Order Total: <span className="font-bold">${order.total_amount.toFixed(2)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <a href={route('orders.show', order.id)}>View Order</a>
            </Button>
            <Button asChild>
              <a href={route('products.index')}>Continue Shopping</a>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}