export interface Order {
    id: number;
    user_id: number | null;
    status: string;
    total_amount: number;
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
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    name: string;
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