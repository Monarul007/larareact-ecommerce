import React, { useEffect } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { AxiosError } from 'axios';

export function Cart() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, total, removeItem, updateQuantity, isLoading, error, fetchCart } = useCart();
  const { toast } = useToast();

  console.log('Cart items:', items);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (id: number, quantity: number, maxStock: number) => {
    try {
      if (quantity < 1) {
        return;
      }
      if (quantity > maxStock) {
        toast({
          title: 'Error',
          description: 'Cannot add more than available stock',
          variant: 'destructive',
        });
        return;
      }
      await updateQuantity(id, quantity);
      await fetchCart();
      toast({
        title: 'Cart Updated',
        description: 'Your cart has been updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to update cart',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeItem(id);
      await fetchCart();
      toast({
        title: 'Item Removed',
        description: 'The item has been removed from your cart.',
        variant: 'default',
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to remove item',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchCart}>Try Again</Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add items to your cart to see them here
              </p>
            </div>
            <Button asChild onClick={() => setIsOpen(false)}>
              <a href={route('products.index')}>Start Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image || '/placeholder.png'}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {Object.entries(item.variation.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(', ')}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.variation.stock)}
                          className="h-6 w-6 rounded border flex items-center justify-center hover:bg-accent disabled:opacity-50"
                          disabled={isLoading || item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.variation.stock)}
                          className="h-6 w-6 rounded border flex items-center justify-center hover:bg-accent disabled:opacity-50"
                          disabled={isLoading || item.quantity >= item.variation.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="font-medium">
                        ${(item.variation.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.variation.id)}
                        className="text-sm text-muted-foreground hover:text-destructive disabled:opacity-50"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipping and taxes will be calculated at checkout
                </p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                asChild
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                <a href={route('checkout.show')}>Proceed to Checkout</a>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}