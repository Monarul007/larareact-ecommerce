import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            className="min-h-[200px] object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {product.variations?.some(v => v.stock === 0) && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Low Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate">{product.brand?.name}</p>
          <div className="mt-2">
            <span className="font-bold">
              ${Math.min(...product.variations.map(v => v.price)).toFixed(2)}
            </span>
            {product.variations.length > 1 && (
              <span className="text-sm text-gray-500"> - from</span>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button variant="secondary" className="w-full" asChild>
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}