import React from 'react';
import { Head } from '@inertiajs/react';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@/types';

interface SearchPageProps {
  query: string;
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

export default function SearchPage({
  query,
  products,
  filters,
  priceRange,
  selectedFilters,
  sortOptions,
  currentSort,
  total,
}: SearchPageProps) {
  return (
    <>
      <Head title={`Search Results: ${query}`} />

      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Search Results: "{query}"
              <span className="text-muted-foreground font-normal ml-2">
                ({total} items)
              </span>
            </h1>

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
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
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