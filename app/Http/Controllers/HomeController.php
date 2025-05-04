<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with(['variations', 'brand'])
            ->where('is_active', true)
            ->inRandomOrder()
            ->take(8)
            ->get();

        $categories = Category::whereIsRoot()
            ->with(['children' => function ($query) {
                $query->where('is_active', true);
            }])
            ->where('is_active', true)
            ->get();
        
        $newArrivals = Product::with(['variations', 'brand'])
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();
            
        $topCategories = Category::whereIsRoot()
            ->with(['children' => function ($query) {
                $query->where('is_active', true);
            }])
            ->where('is_active', true)
            ->withCount('products')
            ->orderBy('products_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newArrivals' => $newArrivals,
            'topCategories' => $topCategories
        ]);
    }
}
