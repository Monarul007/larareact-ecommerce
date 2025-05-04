<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::query()->with('variations');
        
        if ($request->has('search')) {
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

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->has('min_price')) {
            $query->whereHas('variations', function ($q) use ($request) {
                $q->where('price', '>=', $request->get('min_price'));
            });
        }

        if ($request->has('max_price')) {
            $query->whereHas('variations', function ($q) use ($request) {
                $q->where('price', '<=', $request->get('max_price'));
            });
        }

        if ($request->has('in_stock')) {
            $query->whereHas('variations', function ($q) {
                $q->where('stock', '>', 0);
            });
        }

        $products = $query->paginate($request->get('per_page', 15));

        return ProductResource::collection($products);
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load('variations'));
    }
}