import React from 'react';
import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import AddressBook from '@/components/address/AddressBook';
import { useToast } from '@/components/ui/use-toast';

interface Address {
  id: number;
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  addresses: Address[];
}

export default function Addresses({ user, addresses }: Props) {
  const { toast } = useToast();

  const handleAddAddress = (address: Omit<Address, 'id'>) => {
    router.post(route('addresses.store'), address, {
      onSuccess: () => {
        toast({
          title: 'Address Added',
          description: 'Your new address has been added successfully.',
        });
      },
    });
  };

  const handleEditAddress = (id: number, address: Partial<Address>) => {
    router.put(route('addresses.update', id), address, {
      onSuccess: () => {
        toast({
          title: 'Address Updated',
          description: 'Your address has been updated successfully.',
        });
      },
    });
  };

  const handleDeleteAddress = (id: number) => {
    router.delete(route('addresses.destroy', id), {
      onSuccess: () => {
        toast({
          title: 'Address Deleted',
          description: 'The address has been deleted successfully.',
        });
      },
    });
  };

  const handleSetDefault = (id: number) => {
    router.put(route('addresses.set-default', id), {}, {
      onSuccess: () => {
        toast({
          title: 'Default Address Updated',
          description: 'Your default address has been updated.',
        });
      },
    });
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Manage Addresses" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Addresses</h1>
          <p className="text-muted-foreground">
            Add and manage your shipping and billing addresses
          </p>
        </div>

        <AddressBook
          addresses={addresses}
          onAddAddress={handleAddAddress}
          onEditAddress={handleEditAddress}
          onDeleteAddress={handleDeleteAddress}
          onSetDefault={handleSetDefault}
        />
      </div>
    </DashboardLayout>
  );
}