import React from 'react';
import { Head } from '@inertiajs/react';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@/types';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface CategoryPageProps {
  category: Category;
  products: Product[];
  filters: {
    brands: {
      name: string;
      options: Array<{
        value: string;
        label: string;
        count: number;
      }>;
    };
    categories: {
      name: string;
      options: Array<{
        value: string;
        label: string;
        count: number;
      }>;
    };
    attributes: Record<
      string,
      {
        name: string;
        options: Array<{
          value: string;
          label: string;
          count: number;
        }>;
      }
    >;
  };
  priceRange: {
    min: number;
    max: number;
    current: [number, number];
  };
  selectedFilters: Record<string, string[]>;
  sortOptions: Array<{
    value: string;
    label: string;
  }>;
  currentSort: string;
  total: number;
}

export default function CategoryPage({
  category,
  products,
  filters,
  priceRange,
  selectedFilters,
  sortOptions,
  currentSort,
  total,
}: CategoryPageProps) {
  const breadcrumbs = [
    { title: 'Categories', href: '/categories' },
    ...(category.parent
      ? [
          {
            title: category.parent.name,
            href: `/categories/${category.parent.slug}`,
          },
        ]
      : []),
    { title: category.name, href: `/categories/${category.slug}` },
  ];

  return (
    <>
      <Head title={category.name} />

      <div className="relative">
        <div className="h-64 w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} className="text-white/80 mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/90 max-w-2xl">{category.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {total} products in {category.name}
            </p>

            <Select
              value={currentSort}
              onValueChange={(value) => {
                window.location.href = `${window.location.pathname}?${new URLSearchParams({
                  ...selectedFilters,
                  sort: value,
                })}`;
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <ProductFilters
                filters={filters}
                priceRange={priceRange}
                selectedFilters={selectedFilters}
              />
            </div>

            <div className="lg:col-span-9">
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-2">
                    No products found
                  </h2>
                  <p className="text-muted-foreground">
                    Try adjusting your filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}