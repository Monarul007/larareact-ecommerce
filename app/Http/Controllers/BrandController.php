<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::where('is_active', true)
            ->withCount('products')
            ->get();

        return Inertia::render('brands/index', [
            'brands' => $brands
        ]);
    }

    public function show(Brand $brand)
    {
        $brand->load(['products' => function ($query) {
            $query->where('is_active', true)
                ->with(['variations', 'brand']);
        }]);

        $query = $brand->products()
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

        // Apply category filter if present
        if (request()->has('categories')) {
            $categories = request('categories');
            if (!empty($categories)) {
                $query->whereHas('categories', function($q) use ($categories) {
                    $q->whereIn('slug', (array)$categories);
                });
            }
        }

        $products = $query->paginate(12);

        // Get price range
        $priceRange = [
            'min' => $brand->products()->join('product_variations', 'products.id', '=', 'product_variations.product_id')
                ->min('product_variations.price') ?? 0,
            'max' => $brand->products()->join('product_variations', 'products.id', '=', 'product_variations.product_id')
                ->max('product_variations.price') ?? 1000,
        ];

        // Get category filters
        $categories = Category::whereHas('products', function($query) use ($brand) {
            $query->where('brand_id', $brand->id);
        })
        ->withCount(['products' => function($query) use ($brand) {
            $query->where('brand_id', $brand->id);
        }])
        ->get()
        ->map(fn($category) => [
            'value' => $category->slug,
            'label' => $category->name,
            'count' => $category->products_count,
        ]);

        return Inertia::render('brands/show', [
            'brand' => $brand,
            'products' => $products,
            'filters' => [
                'categories' => [
                    'name' => 'Categories',
                    'options' => $categories
                ]
            ],
            'priceRange' => [
                'min' => $priceRange['min'],
                'max' => $priceRange['max'],
                'current' => [
                    request('min_price', $priceRange['min']),
                    request('max_price', $priceRange['max'])
                ]
            ],
            'selectedFilters' => request()->only(['categories', 'min_price', 'max_price']),
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