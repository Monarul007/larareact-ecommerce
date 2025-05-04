<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderTrackingController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\Api\CartController;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Static pages
Route::get('/about', [StaticPageController::class, 'about'])->name('about');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::post('/newsletter', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::get('/careers', [StaticPageController::class, 'careers'])->name('careers');
Route::get('/blog', [StaticPageController::class, 'blog'])->name('blog');
Route::get('/shipping', [StaticPageController::class, 'shipping'])->name('shipping');
Route::get('/returns', [StaticPageController::class, 'returns'])->name('returns');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');
Route::get('/track-order', [StaticPageController::class, 'trackOrder'])->name('track-order');
Route::post('/track-order', [OrderTrackingController::class, 'track'])->name('track-order.submit');
Route::get('/terms', [StaticPageController::class, 'terms'])->name('terms');
Route::get('/privacy', [StaticPageController::class, 'privacy'])->name('privacy');
Route::get('/cookies', [StaticPageController::class, 'cookies'])->name('cookies');

// Guest routes
Route::middleware(['guest'])->group(function () {
    Route::get('/checkout/guest', [CheckoutController::class, 'guest'])->name('checkout.guest');
});

// Category routes
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

// Brand routes
Route::get('/brands', [BrandController::class, 'index'])->name('brands.index');
Route::get('/brands/{brand:slug}', [BrandController::class, 'show'])->name('brands.show');

// Product routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/add', [CartController::class, 'add']);
    Route::delete('/{id}', [CartController::class, 'remove']);
    Route::patch('/{id}', [CartController::class, 'update']);
    Route::delete('/', [CartController::class, 'clear']);
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/admin/orders/{order}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/admin/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.update-status');

    // Product management routes
    Route::get('admin/products', [\App\Http\Controllers\Admin\ProductController::class, 'index'])->name('admin.products.index');
    Route::get('admin/products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create'])->name('admin.products.create');
    Route::post('admin/products', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('admin.products.store');
    Route::get('admin/products/{product}/edit', [\App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('admin.products.destroy');
});

// Customer routes
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
});

// Shared authenticated routes
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
