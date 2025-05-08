import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { items, total, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <MainLayout>
      <Head title="Shopping Cart" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
                  subtotal={total}
                  shipping={0}
                  tax={0}
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
    </MainLayout>
  );
}