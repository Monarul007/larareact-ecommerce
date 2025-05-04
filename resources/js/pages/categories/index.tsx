import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

interface CategoriesPageProps {
  categories: Category[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <>
      <Head title="Product Categories" />

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Product Categories</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block group"
            >
              <Card className="overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="text-white text-2xl font-bold text-center px-4">
                      {category.name}
                    </h2>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-sm mt-2">
                    {category.productCount} Products
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