import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface Order {
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
}

interface OrderHistoryProps {
  orders: Order[];
  showViewAll?: boolean;
}

export default function OrderHistory({ orders, showViewAll = false }: OrderHistoryProps) {
  const getStatusColor = (status: Order['status']): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'delivered':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={route('orders.index')}>View All Orders</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No orders found</p>
            <Button asChild className="mt-4">
              <Link href={route('products.index')}>Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-start justify-between border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex gap-4">
                  {order.items[0]?.product.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={order.items[0].product.image}
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
                <div className="text-right space-y-2">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="ml-2" asChild>
                    <Link href={route('orders.show', order.id)}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}