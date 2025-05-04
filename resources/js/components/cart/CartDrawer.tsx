import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: number;
    product: {
      name: string;
      image: string;
      slug: string;
    };
    variation: {
      price: number;
      attributes: Record<string, string>;
    };
    quantity: number;
  }>;
}

export default function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.variation.price * item.quantity), 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>
        
        {items.length > 0 ? (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-4">
              <CartSummary subtotal={subtotal} />
              <div className="mt-4 space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}