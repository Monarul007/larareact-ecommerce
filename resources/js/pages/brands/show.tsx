import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Brand {
  id: number;
  name: string;
  description: string | null;
  logo: string | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  brand: Brand;
  variations: Array<{
    id: number;
    price: number;
  }>;
}

interface Props {
  brand: Brand;
  products: {
    data: Product[];
    total: number;
  };
}

export default function Show({ brand, products }: Props) {
  return (
    <>
      <Head title={brand.name} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-4">
            {brand.logo && (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-24 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{brand.name}</h1>
              {brand.description && (
                <p className="mt-2 text-gray-600">{brand.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.map((product) => (
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
          ))}
        </div>
      </div>
    </>
  );
}