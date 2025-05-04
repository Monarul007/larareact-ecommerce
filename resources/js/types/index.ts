export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    brand_id: number | null;
    brand?: Brand;
    image?: string;
    variations: ProductVariation[];
    categories?: Category[];
    created_at: string;
    updated_at: string;
}

export interface ProductVariation {
    id: number;
    product_id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
    created_at: string;
    updated_at: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    is_active: boolean;
    parent_id: number | null;
    _lft: number;
    _rgt: number;
    children: Category[];
    parent?: Category;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
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
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: Product;
    created_at: string;
    updated_at: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: any;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface SharedData {
    user: User;
    flash: {
        message?: string;
        error?: string;
    };
}