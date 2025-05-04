import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Package, Truck } from 'lucide-react';

interface OrderStatus {
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
}

interface OrderTrackingProps {
  orderStatus: OrderStatus;
}

export default function OrderTracking({ orderStatus }: OrderTrackingProps) {
  const steps = [
    {
      title: 'Order Placed',
      icon: Clock,
      complete: true,
    },
    {
      title: 'Processing',
      icon: Package,
      complete: ['processing', 'shipped', 'delivered'].includes(orderStatus.status),
    },
    {
      title: 'Shipped',
      icon: Truck,
      complete: ['shipped', 'delivered'].includes(orderStatus.status),
    },
    {
      title: 'Delivered',
      icon: CheckCircle2,
      complete: ['delivered'].includes(orderStatus.status),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${
                      step.complete
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground text-muted-foreground'
                    }
                  `}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-[2px] -z-10">
            <div className="h-full bg-muted" />
            <div
              className="h-full bg-primary transition-all"
              style={{
                width:
                  orderStatus.status === 'pending'
                    ? '0%'
                    : orderStatus.status === 'processing'
                    ? '33%'
                    : orderStatus.status === 'shipped'
                    ? '66%'
                    : orderStatus.status === 'delivered'
                    ? '100%'
                    : '0%',
              }}
            />
          </div>
        </div>

        {/* Shipping Details */}
        {orderStatus.tracking_number && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Carrier</span>
              <span className="font-medium">{orderStatus.carrier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tracking Number</span>
              <span className="font-medium">{orderStatus.tracking_number}</span>
            </div>
            {orderStatus.estimated_delivery && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium">
                  {new Date(orderStatus.estimated_delivery).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Status Updates */}
        {orderStatus.updates.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">Status Updates</h4>
            <div className="space-y-4">
              {orderStatus.updates.map((update, index) => (
                <div key={index} className="relative pl-6 pb-4 last:pb-0">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
                  {index !== orderStatus.updates.length - 1 && (
                    <div className="absolute left-[3px] top-4 bottom-0 w-[2px] bg-muted" />
                  )}
                  <div>
                    <p className="font-medium">{update.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {update.message}
                    </p>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{new Date(update.timestamp).toLocaleString()}</span>
                      {update.location && (
                        <>
                          <span>•</span>
                          <span>{update.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}