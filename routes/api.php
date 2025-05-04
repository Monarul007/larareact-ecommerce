<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
});

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/add', [CartController::class, 'add']);
    Route::delete('/{id}', [CartController::class, 'remove']);
    Route::patch('/{id}', [CartController::class, 'update']);
    Route::delete('/', [CartController::class, 'clear']);
});