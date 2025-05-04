import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, ChevronRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: 'The Future of E-commerce: Trends to Watch in 2025',
      excerpt: 'Discover the latest trends shaping the future of online shopping and how they will impact your business.',
      date: '2025-05-01',
      readTime: '5 min read',
      category: 'Trends',
      image: '/images/blog/ecommerce-trends.jpg',
    },
    {
      title: 'How to Optimize Your Product Pages for Better Conversion',
      excerpt: 'Learn the best practices for creating product pages that convert visitors into customers.',
      date: '2025-04-28',
      readTime: '8 min read',
      category: 'Tips & Tricks',
      image: '/images/blog/product-optimization.jpg',
    },
    {
      title: 'Sustainable E-commerce: Making Your Store Eco-Friendly',
      excerpt: 'Explore ways to make your online store more environmentally friendly while growing your business.',
      date: '2025-04-25',
      readTime: '6 min read',
      category: 'Sustainability',
      image: '/images/blog/eco-friendly.jpg',
    },
    {
      title: 'Understanding Customer Behavior Through Analytics',
      excerpt: 'Deep dive into using analytics to better understand your customers and improve their shopping experience.',
      date: '2025-04-22',
      readTime: '10 min read',
      category: 'Analytics',
      image: '/images/blog/analytics.jpg',
    },
    {
      title: 'Mobile Shopping: Optimizing for the Modern Consumer',
      excerpt: 'Tips and strategies for creating a mobile-first shopping experience that delights customers.',
      date: '2025-04-19',
      readTime: '7 min read',
      category: 'Mobile',
      image: '/images/blog/mobile-shopping.jpg',
    },
    {
      title: 'Building Customer Loyalty in the Digital Age',
      excerpt: 'Strategies for creating lasting relationships with your customers in an increasingly digital world.',
      date: '2025-04-16',
      readTime: '9 min read',
      category: 'Customer Success',
      image: '/images/blog/customer-loyalty.jpg',
    },
  ];

  return (
    <MainLayout>
      <Head title="Blog" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tips, and trends in e-commerce to help grow your business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Card key={index} className="group overflow-hidden">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}