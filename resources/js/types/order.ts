export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderAddress {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
}

export interface OrderTracking {
    status: OrderStatus;
    estimated_delivery?: string;
    tracking_number?: string;
    carrier?: string;
    updates: Array<{
        status: string;
        message: string;
        timestamp: string;
        location?: string;
    }>;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    name: string;
    product?: {
        name: string;
        image?: string;
        slug: string;
    };
    variation?: {
        attributes: Record<string, string>;
    };
}

export interface Order {
    id: number;
    user_id: number | null;
    status: OrderStatus;
    total_amount: number;
    subtotal?: number;
    tax?: number;
    shipping_cost?: number;
    billing_name: string;
    billing_email: string;
    billing_address: string;
    billing_city: string;
    billing_country: string;
    billing_postcode: string;
    shipping_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_country: string;
    shipping_postcode: string;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
    tracking?: OrderTracking;
}

export interface CheckoutFormData {
    billing_name: string;
    billing_email: string;
    billing_address: string;
    billing_city: string;
    billing_country: string;
    billing_postcode: string;
    shipping_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_country: string;
    shipping_postcode: string;
    items: OrderItem[];
    total_amount: number;
}