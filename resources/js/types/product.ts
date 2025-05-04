export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    variations: ProductVariation[];
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