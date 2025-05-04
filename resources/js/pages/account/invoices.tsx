import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface Invoice {
  id: number;
  order_id: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  created_at: string;
  due_date: string;
}

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  invoices: Invoice[];
}

export default function Invoices({ user, invoices }: Props) {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Invoices" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            View and download your order invoices
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {invoices.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No invoices found</p>
                  <Button asChild className="mt-4">
                    <Link href={route('products.index')}>Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">
                          Invoice #{invoice.id}{' '}
                          <span className="text-muted-foreground">
                            (Order #{invoice.order_id})
                          </span>
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <p>
                            Created: {new Date(invoice.created_at).toLocaleDateString()}
                          </p>
                          <p>
                            Due: {new Date(invoice.due_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">
                            ${invoice.total.toFixed(2)}
                          </p>
                          <Badge
                            variant={getStatusColor(invoice.status)}
                            className="mt-1"
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}