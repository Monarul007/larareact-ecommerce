import React, { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { ShoppingBag, User, Settings, Home, MapPin, FileText, Bell, Heart, ChevronDown } from 'lucide-react';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigation = [
    {
      name: 'Back to Shop',
      href: route('home'),
      icon: Home,
      external: true
    },
    {
      name: 'Orders',
      href: route('orders.index'),
      icon: ShoppingBag
    },
    {
      name: 'Wishlist',
      href: route('profile.edit'),
      icon: Heart
    },
    {
      name: 'Invoices',
      href: route('orders.index'),
      icon: FileText
    },
    {
      name: 'Addresses',
      href: route('addresses.index'),
      icon: MapPin
    },
    {
      name: 'Notifications',
      href: route('addresses.index'),
      icon: Bell
    },
  ];
  const accountLinks = [
    {
      name: 'Profile',
      href: route('profile.edit'),
      icon: User,
    },
    {
      name: 'Settings',
      href: route('profile.edit'),
      icon: Settings,
    },
    {
      name: 'Logout',
      href: '#',
      icon: null,
      isLogout: true,
    },
  ];

  function LogoutButton({ className = '', iconOnly = false, children }: { className?: string; iconOnly?: boolean; children?: React.ReactNode }) {
    return (
      <Button
        type="button"
        variant="ghost"
        className={cn(
          'w-full justify-start gap-2 text-red-600 hover:bg-red-50',
          className,
          iconOnly && 'w-auto justify-center'
        )}
        onClick={() => router.post(route('logout'))}
      >
        <svg className={iconOnly ? 'h-5 w-5' : 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        {children || (!iconOnly && 'Logout')}
        {iconOnly && <span className="sr-only">Logout</span>}
      </Button>
    );
  }

  // Profile dropdown close on click outside/escape
  const profileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!profileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setProfileMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [profileMenuOpen]);

  return (
    <div className="min-h-screen">
      {/* Sidebar (desktop) */}
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
              <LogoutButton />
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b bg-background px-4 py-4">
        {/* Hamburger menu */}
        <button
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {/* Logo center */}
        <Link href={route('home')} className="flex-1 flex justify-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>
        {/* User avatar and name on right */}
        <div className="relative flex items-center">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setProfileMenuOpen((open) => !open)}
            aria-label="Open profile menu"
            aria-haspopup="true"
            aria-expanded={profileMenuOpen}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm max-w-[100px] truncate">{user.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          {/* Profile dropdown */}
          {profileMenuOpen && (
            <div
              ref={profileMenuRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
              style={{ minWidth: 180, top: 'calc(100% + 8px)' }}
              tabIndex={-1}
            >
              <div className="py-2">
                {accountLinks.map((item) =>
                  item.isLogout ? (
                    <LogoutButton key={item.name} className="w-full text-left px-4 py-2" iconOnly={false}>
                      {item.name}
                    </LogoutButton>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-accent text-sm"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          />
          {/* Drawer panel */}
          <div className="relative bg-white w-64 max-w-full h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start gap-2",
                    route().current(item.href) && "bg-accent"
                  )}
                  onClick={() => setDrawerOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
              <LogoutButton />
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
}