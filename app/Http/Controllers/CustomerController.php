<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function dashboard(): Response
    {
        $user = Auth::user();

        // Recent orders (limit 5)
        $recentOrders = $user->orders()
            ->with(['items.product'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'product' => [
                                'name' => $item->product ? $item->product->name : $item->name,
                                'image' => $item->product ? $item->product->image : null,
                            ],
                        ];
                    }),
                ];
            });

        // Stats
        $stats = [
            'totalOrders' => $user->orders()->count(),
            'pendingDeliveries' => $user->orders()->whereIn('status', ['pending', 'processing', 'shipped'])->count(),
            'recentPurchases' => $user->orders()->where('created_at', '>=', now()->subDays(30))->count(),
        ];

        return Inertia::render('dashboard', [
            'recentOrders' => $recentOrders,
            'stats' => $stats,
        ]);
    }
}
