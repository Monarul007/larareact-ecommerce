import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Product, ProductVariation } from '@/types';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cartService } from '@/services/cartService';

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
  product: Product;
}

export default function Show({ user, categories, product }: Props) {
  
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const { toast } = useToast();

  const variations = product.variations || [];

  const handleAddToCart = async () => {
    if (!selectedVariation) {
      toast({
        title: "Please select a variation",
        variant: "destructive"
      });
      return;
    }

    try {
      await cartService.addToCart({
        variation_id: selectedVariation.id,
        quantity: 1
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} - ${selectedVariation.name} added to cart`
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout user={user} categories={categories}>
      
      <Head title={product.name} />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square relative">
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
              {product.brand && (
                <Badge variant="outline">{product.brand.name}</Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                {product.description}
              </div>

              <Tabs defaultValue="variations" className="w-full">
                <TabsList>
                  <TabsTrigger value="variations">Variations</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="variations" className="space-y-4">
                  {variations.length > 0 ? (
                    <>
                      <Select
                        value={selectedVariation?.id.toString()}
                        onValueChange={(value) => {
                          const variation = variations.find(v => v.id.toString() === value);
                          setSelectedVariation(variation || null);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select variation" />
                        </SelectTrigger>
                        <SelectContent>
                          {variations.map((variation) => (
                            <SelectItem 
                              key={variation.id} 
                              value={variation.id.toString()}
                              disabled={variation.stock === 0}
                            >
                              {variation.name} - ${variation.price}
                              {variation.stock === 0 && " (Out of stock)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedVariation && (
                        <div className="space-y-2">
                          <p className="text-2xl font-bold">
                            ${selectedVariation.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            Stock: {selectedVariation.stock}
                          </p>
                          <p className="text-sm text-gray-500">
                            SKU: {selectedVariation.sku}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No variations available</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details">
                  {product.categories && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Categories</h3>
                      <div className="flex gap-2">
                        {product.categories.map((category) => (
                          <Badge key={category.id} variant="secondary">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedVariation || selectedVariation.stock === 0 || variations.length === 0}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}