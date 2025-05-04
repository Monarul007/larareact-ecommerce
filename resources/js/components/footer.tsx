import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export function Footer() {
  const { toast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('newsletter.subscribe'), {
      onSuccess: () => {
        reset('email');
        toast({
          title: 'Success!',
          description: 'Thank you for subscribing to our newsletter.',
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: errors.email || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  const footerNavigation = {
    shop: [
      { name: 'All Products', href: route('products.index') },
      { name: 'New Arrivals', href: route('products.index', { sort: 'newest' }) },
      { name: 'Best Sellers', href: route('products.index', { sort: 'popular' }) },
      { name: 'Categories', href: route('categories.index') },
      { name: 'Browse Brands', href: route('brands.index') },
    ],
    company: [
      { name: 'About Us', href: route('about') },
      { name: 'Contact', href: route('contact') },
      { name: 'Careers', href: route('careers') },
      { name: 'Blog', href: route('blog') },
    ],
    support: [
      { name: 'Shipping', href: route('shipping') },
      { name: 'Returns', href: route('returns') },
      { name: 'FAQ', href: route('faq') },
      { name: 'Track Order', href: route('track-order') },
    ],
    legal: [
      { name: 'Terms of Service', href: route('terms') },
      { name: 'Privacy Policy', href: route('privacy') },
      { name: 'Cookie Policy', href: route('cookies') },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: Facebook,
      },
      {
        name: 'Twitter',
        href: '#',
        icon: Twitter,
      },
      {
        name: 'Instagram',
        href: '#',
        icon: Instagram,
      },
      {
        name: 'YouTube',
        href: '#',
        icon: Youtube,
      },
    ],
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Get the latest updates, news and product offers
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-x-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
              <Button type="submit" disabled={processing}>
                {processing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {errors.email && (
              <p className="mt-2 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-4">
              {footerNavigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}