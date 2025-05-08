<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    
    public function index(Request $request): Response
    {
        $query = Auth::user()->isAdmin()
            ? Order::with(['user', 'items.product'])
            : Auth::user()->orders()->with(['items.product']);

        // Filtering
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('billing_name', 'like', "%{$search}%")
                  ->orWhere('billing_email', 'like', "%{$search}%");
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }
        if ($request->filled('date_range')) {
            switch ($request->input('date_range')) {
                case 'today':
                    $query->whereDate('created_at', today());
                    break;
                case 'week':
                    $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $query->whereMonth('created_at', now()->month);
                    break;
                case 'year':
                    $query->whereYear('created_at', now()->year);
                    break;
            }
        }
        if ($request->filled('sort')) {
            switch ($request->input('sort')) {
                case 'oldest':
                    $query->oldest();
                    break;
                case 'total_desc':
                    $query->orderByDesc('total_amount');
                    break;
                case 'total_asc':
                    $query->orderBy('total_amount');
                    break;
                default:
                    $query->latest();
            }
        } else {
            $query->latest();
        }

        $orders = $query->paginate(10)->withQueryString();

        // Format orders for frontend
        $ordersTransformed = [
            'data' => $orders->map(function ($order) {
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
            }),
            'current_page' => $orders->currentPage(),
            'last_page' => $orders->lastPage(),
            'per_page' => $orders->perPage(),
            'total' => $orders->total(),
        ];

        $filters = $request->only(['search', 'status', 'date_range', 'sort']);

        return Inertia::render('orders/index', [
            'orders' => $ordersTransformed,
            'user' => Auth::user(),
            'filters' => $filters,
        ]);
    }

    public function show(Order $order): Response
    {
        if (!Auth::user()->isAdmin() && Auth::id() !== $order->user_id) {
            abort(403);
        }

        $order->load([
            'items.product'
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

        // Transform items for frontend (ensure variation.attributes exists)
        $items = $order->items->map(function ($item) {
            return [
                'id' => $item->id,
                'product' => [
                    'name' => $item->product ? $item->product->name : $item->name,
                    'image' => $item->product ? $item->product->image : null,
                    'slug' => $item->product ? $item->product->slug : null,
                ],
                'variation' => [
                    'attributes' => $item->variation['attributes'] ?? [], // fallback to empty array
                ],
                'quantity' => $item->quantity,
                'price' => $item->price,
            ];
        });

        // Provide a stub tracking object (or null)
        $tracking = [
            'status' => $order->status,
            'estimated_delivery' => null,
            'tracking_number' => null,
            'carrier' => null,
            'updates' => [],
        ];

        return Inertia::render('orders/show', [
            'user' => Auth::user(),
            'order' => [
                'id' => $order->id,
                'total' => $order->total_amount,
                'subtotal' => $order->subtotal ?? $order->total_amount, // fallback
                'tax' => $order->tax ?? 0,
                'shipping_cost' => $order->shipping_cost ?? 0,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'items' => $items,
                'tracking' => $tracking,
                'shipping_address' => $shippingAddress,
                'billing_address' => $billingAddress,
            ],
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
            ->with(['items.product', 'items.variation'])
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

    /**
     * Download invoice PDF for an order
     */
    public function downloadInvoice(Order $order)
    {
        if (!Auth::user()->isAdmin() && Auth::id() !== $order->user_id) {
            abort(403);
        }

        // You can create a Blade view for the invoice or use a simple inline HTML
        $pdf = Pdf::loadView('invoices.order', ['order' => $order]);
        return $pdf->download('invoice-order-' . $order->id . '.pdf');
    }
}