import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';

export default function About() {
  return (
    <MainLayout>
      <Head title="About Us" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to our online store. We are dedicated to providing the best shopping experience
            with a wide selection of high-quality products and exceptional customer service.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded with a vision to revolutionize online shopping, we've grown from a small startup
            to a trusted destination for shoppers worldwide. Our journey is driven by our commitment
            to quality, innovation, and customer satisfaction.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make quality products accessible to everyone while providing an
            exceptional shopping experience. We believe in building lasting relationships with our
            customers through trust, transparency, and outstanding service.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>Customer First: Your satisfaction is our top priority</li>
            <li>Quality: We never compromise on the quality of our products</li>
            <li>Integrity: Honest and transparent in all our dealings</li>
            <li>Innovation: Constantly improving our services and offerings</li>
            <li>Sustainability: Committed to environmentally responsible practices</li>
          </ul>

          <h2>Our Commitment</h2>
          <p>
            We are committed to providing:
          </p>
          <ul>
            <li>Carefully curated, high-quality products</li>
            <li>Excellent customer service</li>
            <li>Secure shopping experience</li>
            <li>Fast and reliable shipping</li>
            <li>Hassle-free returns</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}