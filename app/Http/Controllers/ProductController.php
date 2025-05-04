<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with(['variations', 'brand']);
        
        if ($request->has('search') && !empty($request->get('search'))) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('variations', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('sku', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('category') && !empty($request->get('category'))) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->get('category'));
            });
        }

        if ($request->has('brand') && !empty($request->get('brand'))) {
            $query->where('brand_id', $request->get('brand'));
        }

        if ($request->has('sort') && !empty($request->get('sort'))) {
            switch ($request->get('sort')) {
                case 'price_low':
                    $query->orderByRaw('(SELECT MIN(price) FROM product_variations WHERE product_variations.product_id = products.id) ASC');
                    break;
                case 'price_high':
                    $query->orderByRaw('(SELECT MIN(price) FROM product_variations WHERE product_variations.product_id = products.id) DESC');
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        $products = $query->paginate(15)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => [
                'data' => $products->items(),
                'total' => $products->total(),
                'perPage' => $products->perPage(),
                'currentPage' => $products->currentPage(),
                'lastPage' => $products->lastPage(),
                'links' => $products->onEachSide(1)->links()
            ],
            'categories' => Category::select('id', 'name')->get(),
            'brands' => Brand::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'category', 'brand', 'sort'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        foreach ($request->validated()['variations'] as $variation) {
            $product->variations()->create($variation);
        }

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => new ProductResource($product->load('variations')),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        // Delete variations that are not in the request
        $product->variations()
            ->whereNotIn('id', collect($request->validated()['variations'])->pluck('id')->filter())
            ->delete();

        // Update or create variations
        foreach ($request->validated()['variations'] as $variation) {
            $product->variations()->updateOrCreate(
                ['id' => $variation['id'] ?? null],
                collect($variation)->except('id')->toArray()
            );
        }

        if (RequestFacade::expectsJson()) {
            return new ProductResource($product->load('variations'));
        }

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function show(Product $product)
    {
        $product->load(['variations', 'brand', 'categories']);
        
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }
}