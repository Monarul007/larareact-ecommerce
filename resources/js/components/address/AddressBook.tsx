import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddressForm from './AddressForm';

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

interface AddressBookProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onEditAddress: (id: number, address: Partial<Address>) => void;
  onDeleteAddress: (id: number) => void;
  onSetDefault: (id: number) => void;
}

export default function AddressBook({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
}: AddressBookProps) {
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleAddSubmit = (data: {
    full_name: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    address_line2?: string;
    phone?: string;
    is_default?: boolean;
  }) => {
    onAddAddress({ ...data, is_default: data.is_default ?? false });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (address: Partial<Address>) => {
    if (selectedAddress) {
      onEditAddress(selectedAddress.id, address);
      setIsEditDialogOpen(false);
      setSelectedAddress(null);
    }
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (address: Address) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      onDeleteAddress(address.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Enter the details for your new address
                </DialogDescription>
              </DialogHeader>
              <AddressForm onSubmit={handleAddSubmit} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="min-h-[140px] space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{address.full_name}</p>
                      {address.is_default && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{address.address_line1}</p>
                    {address.address_line2 && (
                      <p className="text-sm">{address.address_line2}</p>
                    )}
                    <p className="text-sm">
                      {address.city}, {address.state} {address.postal_code}
                    </p>
                    <p className="text-sm">{address.country}</p>
                    {address.phone && <p className="text-sm">{address.phone}</p>}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(address)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {!address.is_default && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(address)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Address Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription>
                Update the details for this address
              </DialogDescription>
            </DialogHeader>
            {selectedAddress && (
              <AddressForm
                initialData={selectedAddress}
                onSubmit={handleEditSubmit}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}