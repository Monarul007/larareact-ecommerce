<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'order.access'])->except(['track', 'guestShow']);
    }

    public function index(): Response
    {
        $orders = Auth::user()->isAdmin()
            ? Order::with(['user', 'items.product', 'items.variation'])->latest()->paginate(20)
            : Auth::user()->orders()->with(['items.product', 'items.variation'])->latest()->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'user' => Auth::user()
        ]);
    }

    public function show(Order $order): Response
    {
        if (!Auth::user()->isAdmin() && Auth::id() !== $order->user_id) {
            abort(403);
        }

        $order->load([
            'items.product', 
            'items.variation',
            'tracking'
        ]);

        // Format addresses for frontend
        $billingAddress = [
            'full_name' => $order->billing_name,
            'address_line1' => $order->billing_address,
            'city' => $order->billing_city,
            'country' => $order->billing_country,
            'postal_code' => $order->billing_postcode
        ];

        $shippingAddress = [
            'full_name' => $order->shipping_name,
            'address_line1' => $order->shipping_address,
            'city' => $order->shipping_city,
            'country' => $order->shipping_country,
            'postal_code' => $order->shipping_postcode
        ];

        return Inertia::render('orders/show', [
            'user' => Auth::user(),
            'order' => array_merge($order->toArray(), [
                'billing_address' => $billingAddress,
                'shipping_address' => $shippingAddress
            ])
        ]);
    }

    public function guestShow(Request $request): Response
    {
        $validated = $request->validate([
            'order_number' => 'required|string',
            'email' => 'required|email'
        ]);

        $order = Order::where('id', $validated['order_number'])
            ->where('email', $validated['email'])
            ->with(['items.product', 'items.variation', 'tracking'])
            ->firstOrFail();

        // Format addresses for frontend
        $billingAddress = [
            'full_name' => $order->billing_name,
            'address_line1' => $order->billing_address,
            'city' => $order->billing_city,
            'country' => $order->billing_country,
            'postal_code' => $order->billing_postcode
        ];

        $shippingAddress = [
            'full_name' => $order->shipping_name,
            'address_line1' => $order->shipping_address,
            'city' => $order->shipping_city,
            'country' => $order->shipping_country,
            'postal_code' => $order->shipping_postcode
        ];

        return Inertia::render('orders/guest-show', [
            'order' => array_merge($order->toArray(), [
                'billing_address' => $billingAddress,
                'shipping_address' => $shippingAddress
            ]),
            'categories' => Category::whereIsRoot()
                ->with(['children' => function ($query) {
                    $query->where('is_active', true);
                }])
                ->where('is_active', true)
                ->get()
        ]);
    }

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
            return back()->withErrors([
                'order_number' => 'No order found with these details.'
            ]);
        }

        return redirect()->route('orders.guest.show', [
            'order_number' => $order->id,
            'email' => $order->email
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
        $order->user_id = Auth::id();
        $order->save();

        return redirect()->route('orders.show', $order);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated successfully.');
    }
}