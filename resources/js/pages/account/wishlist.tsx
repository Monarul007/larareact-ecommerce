import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import WishlistManagement from '@/components/wishlist/WishlistManagement';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  wishlist_items: Array<{
    id: number;
    product: {
      id: number;
      name: string;
      slug: string;
      price: number;
      image?: string;
      stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
    };
    added_at: string;
  }>;
}

export default function Wishlist({ user, wishlist_items }: Props) {
  return (
    <DashboardLayout user={user}>
      <Head title="My Wishlist" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            Manage your saved items and add them to cart
          </p>
        </div>

        <WishlistManagement items={wishlist_items} />
      </div>
    </DashboardLayout>
  );
}