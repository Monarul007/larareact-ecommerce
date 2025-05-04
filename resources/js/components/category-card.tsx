import { Link } from '@inertiajs/react';
import { type Category } from '@/types';

interface Props {
    category: Category;
}

export function CategoryCard({ category }: Props) {
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                    src={category.image || 'https://via.placeholder.com/500'} 
                    alt={category.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">
                        <Link href={`/categories/${category.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {category.name}
                        </Link>
                    </h3>
                </div>
            </div>
            {category.children.length > 0 && (
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {category.children.length} subcategories
                    </p>
                </div>
            )}
        </div>
    );
}