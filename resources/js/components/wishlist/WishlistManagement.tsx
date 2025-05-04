import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image?: string;
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  };
  added_at: string;
}

interface Props {
  items: WishlistItem[];
}

export default function WishlistManagement({ items }: Props) {
  const { toast } = useToast();

  const removeFromWishlist = (itemId: number) => {
    router.delete(route('wishlist.destroy', itemId), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Item Removed',
          description: 'The item has been removed from your wishlist.',
        });
      },
    });
  };

  const addToCart = (productId: number) => {
    router.post(route('cart.add'), { product_id: productId }, {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Added to Cart',
          description: 'The item has been added to your cart.',
        });
      },
    });
  };

  const getStockStatus = (status: WishlistItem['product']['stock_status']) => {
    switch (status) {
      case 'in_stock':
        return { label: 'In Stock', variant: 'default' as const };
      case 'low_stock':
        return { label: 'Low Stock', variant: 'secondary' as const };
      case 'out_of_stock':
        return { label: 'Out of Stock', variant: 'destructive' as const };
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Wishlist</CardTitle>
          <div className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Save items that you like and want to purchase later
            </p>
            <Button asChild className="mt-4">
              <Link href={route('products.index')}>Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 pb-6 last:pb-0 border-b last:border-0"
              >
                <Link
                  href={route('products.show', item.product.slug)}
                  className="shrink-0"
                >
                  <img
                    src={item.product.image || '/placeholder.png'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={route('products.show', item.product.slug)}
                        className="font-medium hover:underline line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="font-medium">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <Badge variant={getStockStatus(item.product.stock_status).variant}>
                          {getStockStatus(item.product.stock_status).label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Added {new Date(item.added_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(item.product.id)}
                        disabled={item.product.stock_status === 'out_of_stock'}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}