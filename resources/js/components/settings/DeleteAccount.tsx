import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm({
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsOpen(false);
        reset('password');
      },
    });
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Once your account is deleted, all of its resources and data will be permanently deleted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={submit}>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                  Once your account is deleted, all of its resources and data will be permanently deleted. Please
                  enter your password to confirm you would like to permanently delete your account.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={processing}
                >
                  Delete Account
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <p className="mt-4 text-sm text-muted-foreground">
          Make sure you have backed up any data that you want to keep before proceeding.
        </p>
      </CardContent>
    </Card>
  );
}