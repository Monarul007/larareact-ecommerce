<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::whereIsRoot()
            ->with(['children' => function ($query) {
                $query->where('is_active', true);
            }])
            ->where('is_active', true)
            ->withCount('products')
            ->get();

        return Inertia::render('categories/index', [
            'categories' => $categories
        ]);
    }

    public function show(Category $category)
    {
        $category->load(['parent', 'products' => function ($query) {
            $query->where('is_active', true)
                ->with(['variations', 'brand']);
        }]);

        $query = $category->products()
            ->where('is_active', true)
            ->with(['variations', 'brand']);

        // Apply sorting
        $currentSort = request('sort', 'newest');
        switch ($currentSort) {
            case 'price_asc':
                $query->orderByRaw('(SELECT MIN(price) FROM product_variations WHERE product_variations.product_id = products.id) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('(SELECT MIN(price) FROM product_variations WHERE product_variations.product_id = products.id) DESC');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12);

        // Get price range
        $priceRange = [
            'min' => $category->products()->join('product_variations', 'products.id', '=', 'product_variations.product_id')
                ->min('product_variations.price') ?? 0,
            'max' => $category->products()->join('product_variations', 'products.id', '=', 'product_variations.product_id')
                ->max('product_variations.price') ?? 1000,
        ];

        // Get brand filters
        $brands = $category->products()
            ->join('brands', 'products.brand_id', '=', 'brands.id')
            ->selectRaw('brands.id, brands.name, COUNT(*) as count')
            ->groupBy('brands.id', 'brands.name')
            ->get()
            ->map(fn($brand) => [
                'value' => (string)$brand->id,
                'label' => $brand->name,
                'count' => $brand->count,
            ]);

        return Inertia::render('categories/show', [
            'category' => $category,
            'products' => $products,
            'filters' => [
                'brands' => [
                    'name' => 'Brands',
                    'options' => $brands
                ],
                'categories' => [
                    'name' => 'Categories',
                    'options' => Category::where('parent_id', $category->id)
                        ->withCount('products')
                        ->get()
                        ->map(fn($cat) => [
                            'value' => $cat->slug,
                            'label' => $cat->name,
                            'count' => $cat->products_count,
                        ])
                ],
                'attributes' => []
            ],
            'priceRange' => [
                'min' => $priceRange['min'],
                'max' => $priceRange['max'],
                'current' => [
                    request('min_price', $priceRange['min']),
                    request('max_price', $priceRange['max'])
                ]
            ],
            'selectedFilters' => request()->only(['brands', 'categories', 'min_price', 'max_price']),
            'sortOptions' => [
                ['value' => 'newest', 'label' => 'Newest'],
                ['value' => 'price_asc', 'label' => 'Price: Low to High'],
                ['value' => 'price_desc', 'label' => 'Price: High to Low'],
            ],
            'currentSort' => $currentSort,
            'total' => $products->total()
        ]);
    }
}