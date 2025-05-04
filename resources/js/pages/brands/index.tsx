import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  products_count: number;
}

interface Props {
  brands: Brand[];
}

export default function Index({ brands }: Props) {
  return (
    <>
      <Head title="Brands" />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Our Brands</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={route('brands.show', brand.slug)}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {brand.logo && (
                    <div className="aspect-square relative mb-4">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
                  {brand.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {brand.description}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {brand.products_count} {brand.products_count === 1 ? 'product' : 'products'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}