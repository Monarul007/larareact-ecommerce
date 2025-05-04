import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: {
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
  };
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    router.post(`/cart/${item.id}`, {
      _method: 'PATCH',
      quantity: newQuantity,
    });
  };

  const removeItem = () => {
    router.delete(`/cart/${item.id}`);
  };

  const formatAttributes = (attributes: Record<string, string>) => {
    return Object.entries(attributes)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  return (
    <div className="flex gap-4 py-4">
      <Link href={`/products/${item.product.slug}`} className="shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded-md"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link 
          href={`/products/${item.product.slug}`}
          className="font-medium hover:underline truncate block"
        >
          {item.product.name}
        </Link>
        
        <p className="text-sm text-muted-foreground">
          {formatAttributes(item.variation.attributes)}
        </p>
        
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.quantity - 1)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center"
            min="1"
          />
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <span className="font-medium">
          ${(item.variation.price * item.quantity).toFixed(2)}
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={removeItem}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}