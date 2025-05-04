import { useState } from 'react';
import { router } from '@inertiajs/react';
import { type Order } from '@/types/order';

interface Props {
    orders: Order[];
}

const ORDER_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

export default function AdminOrders({ orders }: Props) {
    const [updatingOrder, setUpdatingOrder] = useState<number | null>(null);

    const updateOrderStatus = (orderId: number, status: string) => {
        setUpdatingOrder(orderId);
        router.patch(
            `/admin/orders/${orderId}/status`,
            { status },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingOrder(null),
            }
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Order ID</th>
                            <th className="py-2 px-4 border">Customer</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Total</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">#{order.id}</td>
                                <td className="py-2 px-4 border">{order.billing_name}</td>
                                <td className="py-2 px-4 border">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        disabled={updatingOrder === order.id}
                                        className={`w-full p-1 border rounded ${
                                            order.status === 'pending' ? 'bg-yellow-50' :
                                            order.status === 'completed' ? 'bg-green-50' :
                                            order.status === 'cancelled' ? 'bg-red-50' :
                                            'bg-blue-50'
                                        }`}
                                    >
                                        {ORDER_STATUSES.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 px-4 border text-right">
                                    ${order.total_amount.toFixed(2)}
                                </td>
                                <td className="py-2 px-4 border">
                                    <div className="flex space-x-2 justify-center">
                                        <a
                                            href={`/admin/orders/${order.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Details
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-center py-4 text-gray-500">
                    No orders found.
                </p>
            )}
        </div>
    );
}