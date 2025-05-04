import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCardV2({ product }: ProductCardProps) {
    return (
        <Link key={product.id} href={route('products.show', product.slug)}>
            <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                    <img
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-t-lg"
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    {product.brand && (
                        <Badge variant="outline" className="mb-2">
                            {product.brand.name}
                        </Badge>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    {product.variations.length > 0 && (
                        <p className="font-bold text-lg">
                            From ${Math.min(...product.variations.map(v => v.price)).toFixed(2)}
                        </p>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}