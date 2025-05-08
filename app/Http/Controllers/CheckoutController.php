<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('checkout/index', [
            'user' => auth()->user()
        ]);
    }

    public function guest(): Response
    {
        return Inertia::render('checkout/guest');
    }

    public function process(Request $request)
    {
        // For guest checkout, validate email
        if (!auth()->check()) {
            $request->validate([
                'email' => 'required|email'
            ]);
        }

        // Validate checkout data (do not store card info)
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
            'items' => 'required|array',
            'total' => 'required|numeric|min:0',
        ]);

        // Map form fields to order fields
        $orderData = [
            'billing_name' => $validated['name'],
            'billing_email' => $validated['email'],
            'billing_address' => $validated['address'],
            'billing_city' => $validated['city'],
            'billing_country' => $validated['country'],
            'billing_postcode' => $validated['postal_code'],
            'shipping_name' => $validated['name'],
            'shipping_address' => $validated['address'],
            'shipping_city' => $validated['city'],
            'shipping_country' => $validated['country'],
            'shipping_postcode' => $validated['postal_code'],
            'total_amount' => $validated['total'],
            'status' => 'pending',
        ];

        if (auth()->check()) {
            $orderData['user_id'] = auth()->id();
        }

        $order = \App\Models\Order::create($orderData);

        // Save order items
        foreach ($validated['items'] as $item) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']['id'] ?? null,
                'name' => $item['product']['name'] ?? $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['variation']['price'] ?? $item['price'],
            ]);
        }

        // Optionally: clear cart here
        session()->forget('cart');

        return Inertia::render('checkout/success', ['order' => $order])->with('success', 'Order placed successfully.');
    }

    public function success(Request $request): Response
    {
        return Inertia::render('checkout/success', [
            'order' => $request->order
        ]);
    }
}