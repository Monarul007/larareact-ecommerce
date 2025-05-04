import { Link } from '@inertiajs/react';
import { type Product } from '@/types';
import { Button } from './ui/button';
import { HeartIcon, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

interface Props {
    product: Product;
}

export function ProductCard({ product }: Props) {
    // Get the lowest price from variations
    const lowestPrice = Math.min(...product.variations.map((v) => v.price));

    return (
        <div className="group relative">
            <div className="aspect-square aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                    src={product.image || '/placeholder.png'} 
                    alt={product.name}
                    className="border h-full w-full object-cover object-center group-hover:opacity-75"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder.png';
                    }}
                />
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm"
                    >
                        <HeartIcon className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700 dark:text-gray-200">
                        <Link href={`/products/${product.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {product.variations.length} {product.variations.length === 1 ? 'variant' : 'variants'}
                    </p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    From {formatCurrency(lowestPrice)}
                </p>
            </div>
        </div>
    );
}