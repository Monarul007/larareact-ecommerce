import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Password({ user }: Props) {
  const { toast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('password.update'), {
      onSuccess: () => {
        toast({
          title: "Password Updated",
          description: "Your password has been changed successfully.",
        });
        reset();
      },
    });
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Change Password" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Change Password</h1>
            <p className="text-muted-foreground">
              Ensure your account is using a secure password
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={e => setData('current_password', e.target.value)}
                  />
                  {errors.current_password && (
                    <p className="text-sm text-red-500">{errors.current_password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm New Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
