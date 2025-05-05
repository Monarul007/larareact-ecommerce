<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Calculate metrics for the dashboard
        $now = Carbon::now();
        $monthStart = $now->copy()->startOfMonth();
        $lastMonthStart = $now->copy()->subMonth()->startOfMonth();

        // Revenue metrics
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $thisMonthRevenue = Order::where('status', '!=', 'cancelled')
            ->where('created_at', '>=', $monthStart)
            ->sum('total_amount');
        $lastMonthRevenue = Order::where('status', '!=', 'cancelled')
            ->whereBetween('created_at', [$lastMonthStart, $monthStart])
            ->sum('total_amount');
        
        $revenueGrowth = $lastMonthRevenue > 0 
            ? (($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100 
            : 100;

        // Get daily sales history for the chart
        $salesHistory = Order::where('status', '!=', 'cancelled')
            ->where('created_at', '>=', $now->copy()->subDays(30))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as revenue'),
                DB::raw('COUNT(*) as orders')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'revenue' => (float) $item->revenue,
                    'orders' => (int) $item->orders
                ];
            });

        // Recent orders
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer' => $order->user ? $order->user->name : $order->billing_name,
                    'total' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at
                ];
            });

        // Top products
        $topProducts = Product::withCount(['orderItems as sales'])
            ->withSum('orderItems as revenue', DB::raw('price * quantity'))
            ->orderByDesc('sales')
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sales' => $product->sales,
                    'revenue' => $product->revenue
                ];
            });

        return Inertia::render('admin/dashboard', [
            'metrics' => [
                'totalRevenue' => $totalRevenue,
                'totalOrders' => Order::count(),
                'totalCustomers' => User::where('role', 'customer')->count(),
                'totalProducts' => Product::count(),
                'revenueGrowth' => round($revenueGrowth, 1),
                'salesHistory' => $salesHistory,
                'recentOrders' => $recentOrders,
                'topProducts' => $topProducts
            ]
        ]);
    }
}