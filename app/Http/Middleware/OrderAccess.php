<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderAccess
{
    public function handle(Request $request, Closure $next)
    {
        $order = $request->route('order');
        
        if (!$order) {
            return $next($request);
        }

        if (auth()->user()->isAdmin()) {
            return $next($request);
        }

        if (auth()->id() !== $order->user_id) {
            abort(403, 'Unauthorized access to order.');
        }

        return $next($request);
    }
}