import React from 'react';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
}

export default function CartSummary({ subtotal, shipping = 0, tax = 0 }: CartSummaryProps) {
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}