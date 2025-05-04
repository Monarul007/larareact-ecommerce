import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const addressSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  address_line1: z.string().min(5, 'Address is required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postal_code: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
  is_default: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  initialData?: AddressFormData;
  onSubmit: (data: AddressFormData) => void;
}

export default function AddressForm({ initialData, onSubmit }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      is_default: false,
    },
  });

  // This would typically come from an API or configuration
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    // Add more countries as needed
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          {...register('full_name')}
        />
        {errors.full_name && (
          <p className="text-sm text-destructive">{errors.full_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line1">Address Line 1</Label>
        <Input
          id="address_line1"
          {...register('address_line1')}
        />
        {errors.address_line1 && (
          <p className="text-sm text-destructive">{errors.address_line1.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line2">
          Address Line 2 <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="address_line2"
          {...register('address_line2')}
        />
        {errors.address_line2 && (
          <p className="text-sm text-destructive">{errors.address_line2.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
                id="city"
                {...register('city')}
            />
            {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            {...register('state')}
          />
            {errors.state && (
                <p className="text-sm text-destructive">{errors.state.message}</p>
            )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input
            id="postal_code"
            {...register('postal_code')}
          />
            {errors.postal_code && (
                <p className="text-sm text-destructive">{errors.postal_code.message}</p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={initialData?.country}
            onValueChange={(value) => setValue('country', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Address'}
        </Button>
      </div>
    </form>
  );
}