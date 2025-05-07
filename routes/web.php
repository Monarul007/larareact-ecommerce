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
use App\Http\Controllers\Settings\AddressController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\CartController;

// Public/Guest routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Guest order tracking and viewing
Route::middleware('guest')->group(function () {
    Route::get('/track-order', [StaticPageController::class, 'trackOrder'])->name('track-order');
    Route::post('/track-order', [OrderTrackingController::class, 'track'])->name('order.track');
    Route::get('/orders/guest', [OrderController::class, 'guestShow'])
        ->name('orders.guest.show')
        ->middleware('signed');
});

// Product browsing (public)
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/brands', [BrandController::class, 'index'])->name('brands.index');
Route::get('/brands/{brand:slug}', [BrandController::class, 'show'])->name('brands.show');

// Guest checkout and order tracking
Route::get('/checkout/guest', [CheckoutController::class, 'guest'])->name('checkout.guest');
Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/add', [CartController::class, 'add']);
    Route::delete('/{id}', [CartController::class, 'remove']);
    Route::patch('/{id}', [CartController::class, 'update']);
    Route::delete('/', [CartController::class, 'clear']);
});

// Static pages
Route::get('/about', [StaticPageController::class, 'about'])->name('about');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/shipping', [StaticPageController::class, 'shipping'])->name('shipping');
Route::get('/returns', [StaticPageController::class, 'returns'])->name('returns');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');
Route::get('/terms', [StaticPageController::class, 'terms'])->name('terms');
Route::get('/privacy', [StaticPageController::class, 'privacy'])->name('privacy');

// Customer routes
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Order management
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    
    // Checkout for authenticated customers
    Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
    
    // Address management
    Route::get('/settings/addresses', [AddressController::class, 'index'])->name('addresses.index');
    Route::post('/settings/addresses', [AddressController::class, 'store'])->name('addresses.store');
    Route::put('/settings/addresses/{address}', [AddressController::class, 'update'])->name('addresses.update');
    Route::delete('/settings/addresses/{address}', [AddressController::class, 'destroy'])->name('addresses.destroy');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    
    // Order management
    Route::get('/orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.update-status');
    
    // Product management
    Route::get('/products', [\App\Http\Controllers\Admin\ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/products', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/products/{product}/edit', [\App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('admin.products.destroy');
});

// Authentication routes
require __DIR__.'/auth.php';
// Settings routes (for authenticated users)
require __DIR__.'/settings.php';
