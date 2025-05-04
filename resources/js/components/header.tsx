import React from 'react';
import { Link } from '@inertiajs/react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cart } from '@/components/cart';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface Props {
  categories: Category[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Header({ categories, user }: Props) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = route('products.index', { search: searchQuery });
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {categories && categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={route('products.index', { category: category.slug })}
                        className="text-lg font-medium"
                      >
                        {category.name}
                      </Link>
                      {category.children && (
                        <div className="ml-4 mt-2 space-y-2">
                          {category.children.map((child) => (
                            <Link
                              key={child.id}
                              href={route('products.index', { category: child.slug })}
                              className="block text-gray-600 hover:text-gray-900"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={route('home')}>
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories && categories.map((category) => (
                        <NavigationMenuLink
                          key={category.id}
                          asChild
                        >
                          <Link
                            href={route('products.index', { category: category.slug })}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                            {category.children && (
                              <div className="mt-2 space-y-2">
                                {category.children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={route('products.index', { category: child.slug })}
                                    className="block text-sm text-muted-foreground"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={route('products.index', { sort: 'newest' })} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    New Arrivals
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={route('products.index', { sort: 'popular' })} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Best Sellers
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search, Cart, and User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Search className="h-6 w-6" />
              )}
            </Button>

            {/* Cart */}
            <Cart />

            {/* User Menu */}
            {user ? (
              <Link
                href={route('dashboard')}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="h-7 w-7 rounded-full"
                />
              </Link>
            ) : (
              <Button asChild variant="ghost">
                <Link href={route('login')}>Sign in</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search (Expanded) */}
        {isSearchOpen && (
          <div className="border-t py-4 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}