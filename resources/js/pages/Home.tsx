import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image?: string;
  is_active: boolean;
  brand_id: number | null;
  brand?: {
    id: number;
    name: string;
    slug: string;
  };
  variations: Array<{
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
  }>;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface Props {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  categories: Category[];
  featuredProducts: Product[];
  newArrivals: Product[];
  topCategories: Category[];
}

export default function Home({ user, categories, featuredProducts, newArrivals, topCategories }: Props) {
  return (
    <MainLayout user={user} categories={categories}>
      <Head title="Welcome" />

      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Shop the latest trends and find everything you need, all in one place.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href={route('products.index')}>
                Start Shopping
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Button variant="ghost" asChild>
              <a href={route('categories.index')} className="flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topCategories && topCategories.map((category) => (
              <a
                key={category.id}
                href={route('products.index', { category: category.slug })}
                className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                {category.image && (
                  <img
                    src={category.image || '/placeholder-category.png'}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-category.png';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <a href={route('products.index')} className="flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts.map((product) => (
              <Card key={product.id} className="group">
                <a href={route('products.show', product.slug)}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-2 font-bold">
                      ${Math.min(...product.variations.map(v => v.price)).toFixed(2)}
                    </p>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Button variant="ghost" asChild>
              <a 
                href={route('products.index', { sort: 'newest' })}
                className="flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals && newArrivals.map((product) => (
              <Card key={product.id} className="group">
                <a href={route('products.show', product.slug)}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2">New</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-2 font-bold">
                      ${Math.min(...product.variations.map(v => v.price)).toFixed(2)}
                    </p>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="mt-4">
              Subscribe to our newsletter and get the latest updates on new products and special offers.
            </p>
            <form className="mt-8 flex gap-x-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-w-sm rounded-md px-4 py-2 text-gray-900"
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}