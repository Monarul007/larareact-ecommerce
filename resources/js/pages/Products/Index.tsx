import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Product } from '@/types';
import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface Props {
  products: {
    data: Product[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  categories: Category[];
  brands: Array<{ id: number; name: string }>;
  filters: {
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
  };
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Index({ user, products, categories, brands, filters }: Props) {

  const { data, setData, get } = useForm({
    search: filters.search || '',
    category: filters.category || '',
    brand: filters.brand || '',
    sort: filters.sort || 'latest'
  });

  const handleFilter = () => {
    get(route('products.index'), {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handlePageChange = (page: number) => {
    get(route('products.index', { page, ...data }), {
      preserveState: true,
      preserveScroll: true
    });
  };

  return (
    <MainLayout user={user} categories={categories}>
      <Head title="Products" />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search products..."
            value={data.search}
            onChange={e => {
              setData('search', e.target.value);
              handleFilter();
            }}
          />

          <Select 
            value={data.category} 
            onValueChange={value => {
              setData('category', value !== 'all' ? value : '');
              handleFilter();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={data.brand} 
            onValueChange={value => {
              setData('brand', value !== 'all' ? value : '');
              handleFilter();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={data.sort} 
            onValueChange={value => {
              setData('sort', value);
              handleFilter();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {products.lastPage > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(products.currentPage - 1)}
                disabled={products.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(products.currentPage + 1)}
                disabled={products.currentPage === products.lastPage}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Page {products.currentPage} of {products.lastPage} ({products.total} items)
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}