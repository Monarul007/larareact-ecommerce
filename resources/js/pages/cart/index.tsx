import React from 'react';
import { Head } from '@inertiajs/react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface CartPageProps {
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
  shipping: number;
  tax: number;
}

export default function CartPage({ items, shipping, tax }: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.variation.price * item.quantity), 0);

  return (
    <>
      <Head title="Shopping Cart" />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="bg-card rounded-lg shadow-sm divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-6 sticky top-4">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                />
                
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}