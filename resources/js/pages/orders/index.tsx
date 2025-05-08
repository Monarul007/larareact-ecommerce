import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Eye, Calendar } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';

interface Order {
  id: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    product: {
      name: string;
      image?: string;
    };
  }>;
  created_at: string;
}

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  orders: {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    date_range?: string;
    sort?: string;
  };
}

export default function Orders({ user, orders, filters }: Props) {
  const getStatusColor = (status: Order['status']): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    window.location.href = route('orders.index', {
      ...filters,
      search: formData.get('search'),
      page: 1,
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    window.location.href = route('orders.index', {
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Orders" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-muted-foreground">
                View and manage your order history
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  {/* Search */}
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="search"
                        placeholder="Search orders..."
                        className="pl-9"
                        defaultValue={filters.search}
                      />
                    </div>
                  </form>

                  {/* Status Filter */}
                  <Select
                    value={filters.status || 'all'}
                    onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date Range Filter */}
                  <Select
                    value={filters.date_range}
                    onValueChange={(value) => handleFilterChange('date_range', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select
                    value={filters.sort}
                    onValueChange={(value) => handleFilterChange('sort', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="total_desc">Highest Total</SelectItem>
                      <SelectItem value="total_asc">Lowest Total</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Info */}
                <div className="text-sm text-muted-foreground">
                  Showing {orders.data.length} of {orders.total} orders
                </div>
              </div>

              {/* Orders Table */}
              <div className="mt-6 relative">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.data.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>
                          {order.items.length} item{order.items.length !== 1 && 's'}
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={route('orders.show', order.id)}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {orders.data.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {orders.last_page > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={orders.current_page}
                    totalPages={orders.last_page}
                    onPageChange={(page) =>
                      window.location.href = route('orders.index', {
                        ...filters,
                        page,
                      })
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}