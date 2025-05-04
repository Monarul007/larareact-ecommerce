<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = auth()->user()->isAdmin() 
            ? Order::with('user')->latest()->get()
            : auth()->user()->orders()->latest()->get();

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order): Response
    {
        if (!auth()->user()->isAdmin() && auth()->id() !== $order->user_id) {
            abort(403);
        }

        return Inertia::render('orders/show', [
            'order' => $order->load('items')
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
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

        $order = new Order($validated);
        $order->user_id = auth()->id();
        $order->save();

        return redirect()->route('orders.show', $order);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled'
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated successfully');
    }
}