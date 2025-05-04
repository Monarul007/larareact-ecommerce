import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/hooks/useTheme';

type Theme = 'light' | 'dark' | 'system';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Appearance({ user }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <DashboardLayout user={user}>
      <Head title="Appearance Settings" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Appearance</h1>
          <p className="text-muted-foreground">
            Customize how the application looks and feels
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Choose your preferred color scheme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue={theme}
              onValueChange={(value: Theme) => setTheme(value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <div className="mb-4 rounded-md border bg-[#ffffff] p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="bg-neutral-200 h-2 w-[80px] rounded" />
                    <div className="bg-neutral-200 h-2 w-[100px] rounded" />
                  </div>
                </div>
                <span className="font-medium">Light</span>
              </Label>

              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <div className="mb-4 rounded-md border bg-[#1a1a1a] p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="bg-neutral-800 h-2 w-[80px] rounded" />
                    <div className="bg-neutral-800 h-2 w-[100px] rounded" />
                  </div>
                </div>
                <span className="font-medium">Dark</span>
              </Label>

              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <div className="mb-4 rounded-md border bg-[#ffffff] dark:bg-[#1a1a1a] p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="bg-neutral-200 dark:bg-neutral-800 h-2 w-[80px] rounded" />
                    <div className="bg-neutral-200 dark:bg-neutral-800 h-2 w-[100px] rounded" />
                  </div>
                </div>
                <span className="font-medium">System</span>
              </Label>
            </RadioGroup>

            <p className="text-sm text-muted-foreground">
              Select "System" to automatically match your device's theme preferences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose how you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Notification preferences will be added in a future update.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
            <CardDescription>
              Choose your preferred language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Language preferences will be added in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
