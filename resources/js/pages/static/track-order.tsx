import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { 
  Package,
  Search,
  Mail,
} from 'lucide-react';

export default function TrackOrder() {
  const { data, setData, post, processing } = useForm({
    orderNumber: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <MainLayout>
      <Head title="Track Order" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <Package className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number and email address to track your shipment
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                    Order Number
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="orderNumber"
                      placeholder="Enter your order number"
                      value={data.orderNumber}
                      onChange={e => setData('orderNumber', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
                <p>
                  Can't find your order number? Check your order confirmation email
                  or contact our customer support team for assistance.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              For any other questions, please visit our{' '}
              <a href={route('faq')} className="text-primary hover:underline">
                FAQ page
              </a>
              {' '}or{' '}
              <a href={route('contact')} className="text-primary hover:underline">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}