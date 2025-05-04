import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingBag, User, Settings, Home, MapPin, FileText, Bell, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Props {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function DashboardLayout({ children, user }: Props) {
  const navigation = [
    {
      name: 'Back to Shop',
      href: route('home'),
      icon: Home,
      external: true
    },
    {
      name: 'Account Overview',
      href: route('account.overview'),
      icon: User
    },
    {
      name: 'Orders',
      href: route('orders.index'),
      icon: ShoppingBag
    },
    {
      name: 'Wishlist',
      href: route('account.wishlist'),
      icon: Heart
    },
    {
      name: 'Invoices',
      href: route('account.invoices'),
      icon: FileText
    },
    {
      name: 'Addresses',
      href: route('settings.addresses'),
      icon: MapPin
    },
    {
      name: 'Notifications',
      href: route('settings.notifications'),
      icon: Bell
    },
    {
      name: 'Settings',
      href: route('profile.edit'),
      icon: Settings
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link href={route('home')} className="flex items-center gap-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </Link>

            {/* User Info */}
            <div className="mt-6 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Navigation */}
          <ScrollArea className="flex-1 py-6">
            <nav className="px-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start gap-2",
                    route().current(item.href) && "bg-accent"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center gap-4 border-b bg-background px-4 py-4">
        <Link href={route('home')}>
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>

        <nav className="flex-1 flex items-center justify-end gap-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              asChild
            >
              <Link
                href={item.href}
                className={cn(
                  route().current(item.href) && "text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
}