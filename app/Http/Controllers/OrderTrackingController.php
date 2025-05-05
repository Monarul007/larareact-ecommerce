<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;

class OrderTrackingController extends Controller
{
    public function track(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'order_number' => 'required|string',
            'email' => 'required|email'
        ]);

        $order = Order::where('id', $validated['order_number'])
            ->where('email', $validated['email'])
            ->first();

        if (!$order) {
            throw ValidationException::withMessages([
                'order_number' => 'No order found with these details.'
            ]);
        }

        // Generate a signed URL for the guest order view
        $url = URL::signedRoute('orders.guest.show', [
            'order_number' => $validated['order_number'],
            'email' => $validated['email']
        ]);

        return redirect($url);
    }
}