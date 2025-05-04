<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'variation_id' => 'required|exists:product_variations,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $variation = ProductVariation::with('product')->findOrFail($validated['variation_id']);
        
        if ($variation->stock < $validated['quantity']) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cart = Session::get('cart', []);
        
        if (isset($cart[$variation->id])) {
            $newQuantity = $cart[$variation->id]['quantity'] + $validated['quantity'];
            if ($newQuantity > $variation->stock) {
                return response()->json([
                    'message' => 'Cannot add more of this item'
                ], 422);
            }
            $cart[$variation->id]['quantity'] = $newQuantity;
        } else {
            $cart[$variation->id] = [
                'quantity' => $validated['quantity'],
                'variation' => $variation->toArray(),
                'product' => [
                    'id' => $variation->product->id,
                    'name' => $variation->product->name,
                    'image' => $variation->product->image,
                    'slug' => $variation->product->slug,
                ]
            ];
        }

        Session::put('cart', $cart);

        return response()->json([
            'message' => 'Item added to cart',
            'cart' => $cart
        ]);
    }

    public function remove(Request $request, $id): JsonResponse
    {
        $cart = Session::get('cart', []);
        
        if (isset($cart[$id])) {
            unset($cart[$id]);
            Session::put('cart', $cart);
        }

        return response()->json([
            'message' => 'Item removed from cart',
            'cart' => $cart
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Session::get('cart', []);
        
        if (!isset($cart[$id])) {
            return response()->json([
                'message' => 'Item not found in cart'
            ], 404);
        }

        $variation = ProductVariation::findOrFail($id);
        
        if ($variation->stock < $validated['quantity']) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cart[$id]['quantity'] = $validated['quantity'];
        Session::put('cart', $cart);

        return response()->json([
            'message' => 'Cart updated',
            'cart' => $cart
        ]);
    }

    public function show(): JsonResponse
    {
        $cart = Session::get('cart', []);
        return response()->json(['cart' => $cart]);
    }

    public function clear(): JsonResponse
    {
        Session::forget('cart');
        return response()->json([
            'message' => 'Cart cleared',
            'cart' => []
        ]);
    }
}