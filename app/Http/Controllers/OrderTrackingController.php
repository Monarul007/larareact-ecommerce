<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OrderTrackingController extends Controller
{
    public function track(Request $request)
    {
        $validated = $request->validate([
            'orderNumber' => 'required|string',
            'email' => 'required|email',
        ]);

        $order = Order::where('id', $validated['orderNumber'])
            ->where('email', $validated['email'])
            ->first();

        if (!$order) {
            throw ValidationException::withMessages([
                'orderNumber' => 'No order found with the provided details.',
            ]);
        }

        return back()->with('order', [
            'id' => $order->id,
            'status' => $order->status,
            'created_at' => $order->created_at,
            'total' => $order->total,
            'shipping_address' => $order->shipping_address,
            'items' => $order->items->map(fn($item) => [
                'name' => $item->name,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]),
        ]);
    }
}