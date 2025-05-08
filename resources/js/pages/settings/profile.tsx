import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
}

export default function Profile({ user }: Props) {
  const { toast } = useToast();
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    avatar: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    patch(route('profile.update'), {
      onSuccess: () => {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully.",
        });
      },
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setData('avatar', e.target.files[0]);
    }
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Profile Settings" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile information and settings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  This will be displayed on your profile and throughout the site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={data.avatar ? URL.createObjectURL(data.avatar) : user.avatar}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>
                {errors.avatar && (
                  <p className="text-sm text-destructive">{errors.avatar}</p>
                )}
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    placeholder="Optional"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
