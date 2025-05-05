<?php

namespace App\Http\Middleware;

use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    protected $except = [];

    protected function invalid($request)
    {
        if ($request->routeIs('orders.guest.show')) {
            return redirect()->route('track-order')
                ->withErrors(['error' => 'Invalid or expired order tracking link. Please try again.']);
        }

        return parent::invalid($request);
    }
}