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

        // Validate cart items and checkout data
        $validated = $request->validate([
            'billing_name' => 'required|string',
            'billing_email' => 'required|email',
            'billing_address' => 'required|string',
            'billing_city' => 'required|string',
            'billing_country' => 'required|string',
            'billing_postcode' => 'required|string',
            'shipping_name' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_country' => 'required|string',
            'shipping_postcode' => 'required|string',
            'items' => 'required|array',
            'total_amount' => 'required|numeric|min:0'
        ]);

        // Process payment here...

        // Create order
        $order = auth()->check() 
            ? auth()->user()->orders()->create($validated)
            : Order::create($validated);

        return redirect()->route('checkout.success', ['order' => $order->id]);
    }

    public function success(Request $request): Response
    {
        return Inertia::render('checkout/success', [
            'order' => $request->order
        ]);
    }
}