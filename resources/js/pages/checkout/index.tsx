import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  card_number: string;
  card_expiry: string;
  card_cvc: string;
  [key: string]: string; // Add index signature for FormDataType constraint
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { data, setData, post, processing, errors } = useForm<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    card_number: '',
    card_expiry: '',
    card_cvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('checkout.process'), {
      onSuccess: () => {
        clearCart();
      },
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Head title="Checkout" />
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <a href={route('products.index')}>Continue Shopping</a>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title="Checkout" />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.name} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={cn(errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={cn(errors.email && "border-red-500")}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    className={cn(errors.address && "border-red-500")}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={data.city}
                      onChange={e => setData('city', e.target.value)}
                      className={cn(errors.city && "border-red-500")}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={data.state}
                      onChange={e => setData('state', e.target.value)}
                      className={cn(errors.state && "border-red-500")}
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      value={data.postal_code}
                      onChange={e => setData('postal_code', e.target.value)}
                      className={cn(errors.postal_code && "border-red-500")}
                    />
                    {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={data.country}
                      onChange={e => setData('country', e.target.value)}
                      className={cn(errors.country && "border-red-500")}
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card_number">Card Number</Label>
                  <Input
                    id="card_number"
                    value={data.card_number}
                    onChange={e => setData('card_number', e.target.value)}
                    className={cn(errors.card_number && "border-red-500")}
                  />
                  {errors.card_number && <p className="text-red-500 text-sm">{errors.card_number}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card_expiry">Expiry Date</Label>
                    <Input
                      id="card_expiry"
                      placeholder="MM/YY"
                      value={data.card_expiry}
                      onChange={e => setData('card_expiry', e.target.value)}
                      className={cn(errors.card_expiry && "border-red-500")}
                    />
                    {errors.card_expiry && <p className="text-red-500 text-sm">{errors.card_expiry}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card_cvc">CVC</Label>
                    <Input
                      id="card_cvc"
                      value={data.card_cvc}
                      onChange={e => setData('card_cvc', e.target.value)}
                      className={cn(errors.card_cvc && "border-red-500")}
                    />
                    {errors.card_cvc && <p className="text-red-500 text-sm">{errors.card_cvc}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}